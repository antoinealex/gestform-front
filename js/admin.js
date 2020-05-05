function refreshUser() {
    $.ajax({
        url: BACKEND_URL + "admin/getAllUser",
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: {
            Authorization: `Bearer ${ token }`
        },
        success: function (user) {
            console.log("success GET")
            $.each(user, function (i, user) {
                $('#userList').append('\
                    <tr>\
                        <td>' + user.id + '</td>\
                        <td>' + user.firstname + ' ' + user.lastname + '</td>\
                        <td>' + user.roles[0] + '</td>\
                        <td>\
                        <button id=' + user.id + ' type="button" class="getUser btn btn-success btn-sm" data-toggle="modal" data-target="#myModalGetUser">\
                        <i class="fas fa-eye"></i> Afficher\
                        </button>\
                        <button id=' + user.id + ' type="button" class="updateUser btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateUser">\
                        <i class="fas fa-pen"></i> Editer\
                        </button>\
                        <button id=' + user.id + ' type="button" class="deleteUser btn btn-danger btn-sm">\
                        <i class="fas fa-trash"></i> Supprimer\
                        </button>\
                        </td>\
                    </tr>\
                ')
            });
        },
        error : function( jqXHR, textStatus, errorThrown ){
            alert( textStatus, errorThrown );
        },
        complete : function( jqXHR, textStatus ){
            console.log( textStatus );
        }
    });
}

function refreshTraining() {
    $(document).ready(function (){

        $.ajax({
            url: BACKEND_URL + "training/getAllTraining",
            type: 'GET',
            datatype: 'JSON',
            contentType: "application/json",
            headers: {
                Authorization: `Bearer ${ token }`
            },
            success: function (training) {
                console.log("success GET")
                $.each(training, function (i, training) {

                    var start = training.startTraining;
                    var end = training.endTraining;

                    $('#trainingList').append('\
                    <tr>\
                        <td>' + training.id + '</td>\
                        <td>' + training.subject + '</td>\
                        <td>' + training.teacher['firstname'] + ' ' + training.teacher['lastname'] + '</td>\
                        <td>' + new Date(start.substring(0, 19)).toLocaleString() + '</td>\
                        <td>' + new Date(end.substring(0, 19)).toLocaleString() + '</td>\
                        <td>\
                        <button id=' + training.id + ' type="button" class="getTraining btn btn-success btn-sm" data-toggle="modal" data-target="#myModalGetTraining">\
                        <i class="fas fa-eye"></i> Afficher\
                        </button>\
                        <button id=' + training.id + ' type="button" class="updateTraining btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateTraining">\
                        <i class="fas fa-pen"></i> Editer\
                        </button>\
                        <button id=' + training.id + ' type="button" class="deleteTraining btn btn-danger btn-sm">\
                        <i class="fas fa-trash"></i> Supprimer\
                        </button>\
                        </td>\
                    </tr>\
                    ')
                });
            },
            error : function( jqXHR, textStatus, errorThrown ){
                alert( textStatus, errorThrown );
            },
            complete : function( jqXHR, textStatus ){
                console.log( textStatus );
            }
        });
    });
}

//*****************************************************************************
//********************************** GET **************************************
//*****************************************************************************

//****************getMenu********************
$(document).ready(function(){
    $('#TrainingMenu').append('\
        <a class="nav-link active" id="training-tab" data-toggle="tab" href="#allTrainings" role="tab" aria-controls="training" aria-selected="true">\
            <i class="fas fa-school nav-icon"></i>\
            <p>Cours</p>\
        </a>\
    ');
    $('#UserMenu').append('\
        <a class="nav-link" id="user-tab" data-toggle="tab" href="#allUsers" role="tab" aria-controls="user" aria-selected="false">\
            <i class="fas fa-users nav-icon"></i>\
            <p>Utilisateurs</p>\
        </a>\
    ');
    $('#CalendarMenu').append('\
        <a class="nav-link" id="calendar-tab" data-toggle="tab" href="#calendar" role="tab" aria-controls="calendar" aria-selected="false">\
            <i class="fas fa-calendar nav-icon"></i>\
            <p>Calendrier</p>\
        </a>\
    ');
});

//****************getAllTraining********************
$(document).ready(function (){

    $.ajax({
        url: BACKEND_URL + "training/getAllTraining",
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: {
            Authorization: `Bearer ${ token }`
        },
        success: function (training) {
            console.log("success GET")
            $.each(training, function (i, training) {

                var start = training.startTraining;
                var end = training.endTraining;

                $('#trainingList').append('\
                <tr>\
                    <td>' + training.id + '</td>\
                    <td>' + training.subject + '</td>\
                    <td>' + training.teacher['firstname'] + ' ' + training.teacher['lastname'] + '</td>\
                    <td>' + new Date(start.substring(0, 19)).toLocaleString() + '</td>\
                    <td>' + new Date(end.substring(0, 19)).toLocaleString() + '</td>\
                    <td>\
                    <button id=' + training.id + ' type="button" class="getTraining btn btn-success btn-sm" data-toggle="modal" data-target="#myModalGetTraining">\
                    <i class="fas fa-eye"></i> Afficher\
                    </button>\
                    <button id=' + training.id + ' type="button" class="updateTraining btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateTraining">\
                    <i class="fas fa-pen"></i> Editer\
                    </button>\
                    <button id=' + training.id + ' type="button" class="deleteTraining btn btn-danger btn-sm">\
                    <i class="fas fa-trash"></i> Supprimer\
                    </button>\
                    </td>\
                </tr>\
            ')
        });
        $('#showTraining').DataTable({
            "paging": true,
            "lengthChange": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "autoWidth": false,
            "responsive": true,
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.20/i18n/French.json"
            }
        });
        },
        error : function( jqXHR, textStatus, errorThrown ){
            alert( textStatus, errorThrown );
        },
        complete : function( jqXHR, textStatus ){
            console.log( textStatus );
        }
    });
});


//****************getAllUser********************
$(document).ready(function (){

    $.ajax({
        url: BACKEND_URL + "admin/getAllUser",
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: {
            Authorization: `Bearer ${ token }`
        },
        success: function (user) {
            console.log("success GET")
            $.each(user, function (i, user) {
                $('#userList').append('\
                <tr>\
                    <td>' + user.id + '</td>\
                    <td>' + user.firstname + ' ' + user.lastname + '</td>\
                    <td>' + user.roles[0] + '</td>\
                    <td>\
                    <button id=' + user.id + ' type="button" class="getUser btn btn-success btn-sm" data-toggle="modal" data-target="#myModalGetUser">\
                    <i class="fas fa-eye"></i> Afficher\
                    </button>\
                    <button id=' + user.id + ' type="button" class="updateUser btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateUser">\
                    <i class="fas fa-pen"></i> Editer\
                    </button>\
                    <button id=' + user.id + ' type="button" class="deleteUser btn btn-danger btn-sm">\
                    <i class="fas fa-trash"></i> Supprimer\
                    </button>\
                    </td>\
                </tr>\
            ')
        });
        $('#showUser').DataTable({
            "paging": true,
            "lengthChange": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "autoWidth": false,
            "responsive": true,
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.20/i18n/French.json"
            }
        });
        },
        error : function( jqXHR, textStatus, errorThrown ){
            alert( textStatus, errorThrown );
        },
        complete : function( jqXHR, textStatus ){
            console.log( textStatus );
        }
    });
});

//****************getTrainingById********************
$(document).on('click',".getTraining", function (){
    event.preventDefault();
    var id = $(this).attr('id');

    $.ajax({
        url: BACKEND_URL + "training/getTrainingById?id=" + id,
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: { Authorization: `Bearer ${ token }`},
        
        success: function(training) {
            console.log(id);
            $("p[name=teacher_id]").empty().append(training.teacher["firstname"] + " " + training.teacher["lastname"]);
            $('p[name=start_training]').empty().append(new Date(training.startTraining.substring(0, 19)).toLocaleString());
            $('p[name=end_training]').empty().append(new Date(training.endTraining.substring(0, 19)).toLocaleString());
            $('p[name=max_student]').empty().append(training.maxStudent);
            $('p[name=price_per_student]').empty().append(training.pricePerStudent);
            $('p[name=training_description]').empty().append(training.trainingDescription);
            $('p[name=subject]').empty().append(training.subject);
            // $.each(training, function(i, student){
            //     $('p[name=student_list]').empty().append(student.participants['fistname'])
            // })
        },
        error : function( jqXHR, textStatus, errorThrown ){
            alert( textStatus, errorThrown );
        },
        complete : function( jqXHR, textStatus ){
            console.log( textStatus );
        }
    });
});

//****************getUSerById********************
$(document).on('click',".getUser", function (){
event.preventDefault();
var id = $(this).attr('id');

$.ajax({
    url: BACKEND_URL + "admin/getUserByID?id=" + id,
    type: 'GET',
    datatype: 'JSON',
    contentType: "application/json",
    headers: { Authorization: `Bearer ${ token }`},
    
    success: function(user) {
        console.log(id);
        $("p[name=nom]").empty().append(user.firstname + " " + user.lastname);
        $('p[name=role]').empty().append(user.roles[0]);
        $('p[name=email]').empty().append(user.email);
        $('p[name=phone]').empty().append(user.phone);
        $('p[name=adress]').empty().append(user.address + " " + user.city + " " + user.postcode);
    },
    error : function( jqXHR, textStatus, errorThrown ){
        alert( textStatus, errorThrown );
    },
    complete : function( jqXHR, textStatus ){
        console.log( textStatus );
    }
});
});

//******************************************************************************
//********************************** POST **************************************
//******************************************************************************

//****************addTraining********************

$(document).ready(function (){

    //récupération des teachers
    $.ajax({
        url: BACKEND_URL + "admin/getAllUser",
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: { Authorization: `Bearer ${ token }`},
        success: function(user){
            console.log("success GET")
            $.each(user, function(i, user){
                if (user.roles[0] === "ROLE_TEACHER") {
                    $('select[name=addTeacher]').append('\
                        <option name="newTeacher" value="' + user.id + '">' + user.firstname + ' ' + user.lastname + '</option>\
                    ')
                    }
                });
            }
        });
        //POST
        $("#submit_t").click(function () {
            event.preventDefault();
            data = {};

        $.ajax({
            url: BACKEND_URL + "training/addTraining",
            type: 'POST',
            headers: { Authorization: `Bearer ${ token }`},
            data: {
                teacher_id: $('select[name=addTeacher]').val(),
                start_training: $('input[name=addStart_training]').val(),
                end_training: $('input[name=addEnd_training]').val(),
                max_student: $('input[name=addMax_student]').val(),
                price_per_student: $('input[name=addPrice_per_student]').val(),
                training_description: $('input[name=addTraining_description]').val(),
                subject: $('input[name=addSubject]').val()
            },
            success: function(){
                //location.reload(true);
                $('alertAddTraining').empty().append('\
                    <div class="alert alert-success alert-dismissible" id="successOp" role="alert"">\
                        Opération réalisée avec succès\
                    </div>\
                ').delay(5000).fadeOut(400);
                // Replace tab
                $('#trainingList').load(location.href + " #trainingList", refreshTraining()) 
            },
            error : function( jqXHR, textStatus, errorThrown ){
                console.log( textStatus, errorThrown );
                $('alertAddTraining').empty().append('\
                    <div class="alert alert-danger alert-dismissible" id="errorOp" role="alert"">\
                        Une erreur est survenue\
                    </div>\
                ').delay(5000).fadeOut(400);
            },
            complete : function( jqXHR, textStatus ){
                console.log( textStatus );
            }
        });
    });
});

//****************addUser********************
$("#submit_s").click(function (){
event.preventDefault();
$("span[style^='color:red']").empty();
if ($("#email").val().length === 0) {
    $("#email").after('<span style="color:red"> Merci de remplir ce champ !</span>');
} else if (!$("#email").val().match(/^[a-zA-Z0-9\.\-_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}$/i)) { //Regex validation mail
    $("#email").after('<span style="color:red"> Mail invalide !</span>');
} else if ($("#password").val().length === 0) {
    $("#password").after('<span style="color:red"> Merci de remplir ce champ !</span>');
} else if (!$("#password").val().match(/^(?=.*[a-z])(?=.*[0-9]).{6,}$/i)) { //Regex=> 6 caractéres au moins une lettre et un chiffre
    $("#password").after('<span style="color:red"> 6 caractéres minimum dont un [a-b] et un [0-9] !</span>');

} else {
    data = {};

    $.ajax({
        url: BACKEND_URL + "admin/createUser",
        type: 'POST',
        headers: { Authorization: `Bearer ${ token }`},
        data: {
            email: $('input[name=addEmail]').val(),
            roles: $('select[name=addRoles]').val(),
            password: $('input[name=addPassword]').val(),
            lastname: $('input[name=addLastname]').val(),
            firstname: $('input[name=addFirstname]').val(),
            phone: $('input[name=addPhone]').val(),
            address: $('input[name=addAddress]').val(),
            postcode: $('input[name=addPostcode]').val(),
            city: $('input[name=addCity]').val()
        },
        success: function(){
            $('.alertAddUser').empty().append('\
                <div class="alert alert-success alert-dismissible" id="successOp" role="alert"">\
                    Opération réalisée avec succès\
                </div>\
            ').delay(5000).fadeOut(400);
            // replace tab
            $('#userList').load(location.href + " #userList", refreshUser())
        },
        error : function( jqXHR, textStatus, errorThrown ){
            console.log( textStatus, errorThrown );
            $('.alertAddUser').empty().append('\
                <div class="alert alert-danger alert-dismissible" id="errorOp" role="alert"">\
                    Une erreur est survenue\
                </div>\
            ').delay(5000).fadeOut(400);
        },
        complete : function( jqXHR, textStatus ){
            console.log( textStatus );
        }
    });
}
});

//*****************************************************************************
//********************************** PUT **************************************
//*****************************************************************************

//****************updateTraining********************

$(document).on('click',".updateTraining", function (){
event.preventDefault();
var id = $(this).attr('id');

    $.ajax({
        url: BACKEND_URL + "training/getTrainingById?id=" + id,
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: {
            Authorization: `Bearer ${ token }`
        },

        success: function (training) {
            console.log(id);
            //Formater la date
            var chnStart = training.startTraining;
            var start = chnStart.substring(0, 19);
            var chnEnd = training.endTraining;
            var end = chnEnd.substring(0, 19);

            $('input[name=editTrainingId]').val(training.id)
            $('select[name=teacherSelect]').empty().append('\
        <option name="teacher_name" value="' + training.teacher['id'] + '">' + training.teacher['firstname'] + ' ' + training.teacher['lastname'] + '</option>\
        ')
            //Call ajax pour récupérer les teachers
            $.ajax({
                url: BACKEND_URL + "admin/getAllUser",
                type: 'GET',
                datatype: 'JSON',
                contentType: "application/json",
                headers: {
                    Authorization: `Bearer ${ token }`
                },
                success: function (user) {
                    console.log("success GET")
                    $.each(user, function (i, user) {
                        if (user.roles[0] === "ROLE_TEACHER") {
                            $('select[name=teacherSelect]').append('\
                        <option name="teacher_name" value="' + user.id + '">' + user.firstname + ' ' + user.lastname + '</option>\
                        ')
                    }
                });
            }
        });
        $('input[name=editStart_training]').val(start);
        $('input[name=editEnd_training]').val(end);
        $('input[name=editMax_student]').val(training.maxStudent);
        $('input[name=editPrice_per_student]').val(training.pricePerStudent);
        $('input[name=editTraining_description]').val(training.trainingDescription);
        $('input[name=editSubject]').val(training.subject);
    },
    error : function( jqXHR, textStatus, errorThrown ){
        alert( textStatus, errorThrown );
    },
    complete : function( jqXHR, textStatus ){
        console.log( textStatus );
    }
});
$("#formU").on('click',"#submit_u", function (){
    event.preventDefault();
    var trainingData = {
        id: $('input[name=editTrainingId]').val(),
        teacher_id: $('select[name=teacherSelect]').val(),
        startTraining: $('input[name=editStart_training]').val(),
        endTraining: $('input[name=editEnd_training]').val(),
        maxStudent: $('input[name=editMax_student]').val(),
        pricePerStudent: $('input[name=editPrice_per_student]').val(),
        trainingDescription: $('input[name=editTraining_description]').val(),
        subject: $('input[name=editSubject]').val()
    };
    console.log(JSON.stringify(trainingData))
    $.ajax({
        url: BACKEND_URL + "admin/updateTraining",
        type: 'PUT',
        dataType: 'json', //text
        contentType: "application/json",
        processData: false,
        headers: { Authorization: `Bearer ${ token }`},
        data: JSON.stringify(trainingData),
        success: function(){
            $('.alertUpdateTraining').empty().append('\
                <div class="alert alert-success alert-dismissible" id="successOp" role="alert"">\
                    Opération réalisée avec succès\
                </div>\
            ').delay(5000).fadeOut(400);
             // Replace tab
             $('#trainingList').load(location.href + " #trainingList", refreshTraining())           
        },
        error : function( jqXHR, textStatus, errorThrown ){
            console.log( textStatus, errorThrown );
        $('.alertUpdateTraining').append('\
            <div class="alert alert-danger alert-dismissible" id="errorOp" role="alert"">\
                Une erreur est survenue\
            </div>\
        ').delay(5000).fadeOut(400);
        },
        complete: function (jqXHR, textStatus) {
            console.log(textStatus);
        }
    });
});
});

//****************updateUser********************

$(document).on('click',".updateUser", function (){
event.preventDefault();
var id = $(this).attr('id');

$.ajax({
    url: BACKEND_URL + "admin/getUserByID?id=" + id,
    type: 'GET',
    datatype: 'JSON',
    contentType: "application/json",
    headers: { Authorization: `Bearer ${ token }`},
    
    success: function(user) {
        console.log(id);

        $('input[name=editUserId]').val(id)
        $('input[name=editLastname]').val(user.lastname);
        $('input[name=editFirstname]').val(user.firstname);
        $('select[name=editRoles]').val(user.roles[0]);
        $('input[name=editEmail]').val(user.email)
        $('input[name=editPhone]').val(user.phone);
        $('input[name=editAddress]').val(user.address);
        $('input[name=editPostcode]').val(user.postcode);
        $('input[name=editCity]').val(user.city);
    },
    error : function( jqXHR, textStatus, errorThrown ){
        alert( textStatus, errorThrown );
    },
    complete : function( jqXHR, textStatus ){
        console.log( textStatus );
    }
});
$(document).on('click',"#submit_e", function (){
    event.preventDefault();
    var id = $(this).attr('id');

    $.ajax({
        url: BACKEND_URL + "admin/getUserByID?id=" + id,
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        processData: false,
        headers: { Authorization: `Bearer ${ token }`},
        data: JSON.stringify(userData),
        success: function(){
            console.log(user.id);
            $('.alertUpdateUser').empty().append('\
                <div class="alert alert-success alert-dismissible" id="successOp" role="alert"">\
                    Opération réalisée avec succès\
                </div>\
            ').delay(5000).fadeOut(400);
            // replace tab
            $('#userList').load(location.href + " #userList", refreshUser())
        },
        error : function( jqXHR, textStatus, errorThrown ){
            console.log( textStatus, errorThrown );
            $('.alertUpdateUser').empty().append('\
                <div class="alert alert-danger alert-dismissible" id="errorOp" role="alert"">\
                    Une erreur est survenue\
                </div>\
            ').delay(5000).fadeOut(400);
        },
        complete: function (jqXHR, textStatus) {
            console.log(textStatus);
        }
    });
});
});

//****************update currentUser ********************
$("#account-tab").click(function (e) {
e.preventDefault();

$.ajax({
    url: BACKEND_URL + "user/getCurrentUser",
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    headers: {
        Authorization: `Bearer ${ token }`
    },
    success: function (response) {
        $("input[name=myEmail]").val(response.email);
        $('input[name=myLastname]').val(response.lastname);
        $('input[name=myFirstname]').val(response.firstname);
        $('input[name=myPhone]').val(response.phone);
        $('input[name=myAddress]').val(response.address);
        $('input[name=myPostcode]').val(response.postcode);
        $('input[name=myCity]').val(response.city);
    },
    error: function (jqXhr) {
        alert(jqXhr.responseText);
    },
})
});

$("#submit_up").click(function (e) {
e.preventDefault();
data = {
"email": $("input[name=myEmail]").val(),
"lastname": $('input[name=myLastname]').val(),
"firstname": $('input[name=myFirstname]').val(),
"phone": $('input[name=myPhone]').val(),
"address": $('input[name=myAddress]').val(),
"postcode": $('input[name=myPostcode]').val(),
"city": $('input[name=myCity]').val()
}

    $.ajax({
        url: BACKEND_URL + "user/updateCurrentUser",
        type: 'PUT',
        dataType: 'json', //type de données qu'on attend en réponse du serveur
        contentType: "application/json",
        processData: false, //Définit à false permet d'eviter => application / x-www-form-urlencoded(par default)
        data: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${ token }`
        },

    success: function () {
        $('.alertMessage').empty().append('<br>\
            <div class="alert alert-success alert-dismissible" id="successOp" role="alert"">\
                Opération réalisée avec succès\
            </div>\
        ').delay(5000).fadeOut(400);
    },
    error: function (jqXhr) {
        console.log(jqXhr.responseText);
        $('.alertMessage').empty().append('<br>\
            <div class="alert alert-danger alert-dismissible" id="errorOp" role="alert"">\
                Une erreur est survenue\
            </div>\
        ').delay(5000).fadeOut(400);
    },
});
});

//****************updatePassword*****************************
$("#submit_mdp").click(function (e) {
e.preventDefault();
$("span[style^='color:red']").empty();
if ($("#oldpassword").val().length === 0) {
    $("#oldpassword").after('<span style="color:red"> Merci de remplir ce champ !</span>');
} else if ($("#newpassword").val().length === 0) {
    $("#newpassword").after('<span style="color:red"> Merci de remplir ce champ !</span>');
} else if (!$("#newpassword").val().match(/^(?=.*[a-z])(?=.*[0-9]).{6,}$/i)) { //Regex=> 6 caractéres au moins une lettre et un chiffre
    $("#newpassword").after('<span style="color:red"> 6 caractéres minimum dont un [a-b] et un [0-9] !</span>');

} else {

    data = {
        "oldPassword": $("input[name=oldpassword]").val(),
        "newPassword": $('input[name=newpassword]').val(),
    }

    $.ajax({
        url: BACKEND_URL + 'user/passwordUpdate',
        type: 'PUT',
        dataType: 'json', //type de données qu'on attend en réponse du serveur
        contentType: "application/json",
        processData: false, //Définit à false permet d'eviter => application / x-www-form-urlencoded(par default)
        data: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${ token }`
        },

        success: function () {
            $('.alertUpdateMessage').empty().append('<br>\
            <div class="alert alert-success alert-dismissible" id="successOp" role="alert"">\
                Opération réalisée avec succès\
            </div>\
        ').delay(5000).fadeOut(400);
            location.reload(true);
        },
        error: function (jqXhr) {
            $('.alertUpdateMessage').empty().append('<br>\
            <div class="alert alert-danger alert-dismissible" id="errorOp" role="alert"">\
                Une erreur est survenue\
            </div>\
        ').delay(5000).fadeOut(400);
            console.log(jqXhr.responseText);
            location.reload(true);
        },
    });
}
});

//******************************************************************************
//********************************** DELETE ************************************
//******************************************************************************

//****************deleteTraining********************
$(document).on('click',".deleteTraining", function (){
event.preventDefault();

$(this).text('Chargement');
$.ajax({
    url: BACKEND_URL + "admin/deleteTraining?id=" + $(this).attr('id'),
    type: 'DELETE',
    headers: { Authorization: `Bearer ${ token }`},
    
    success: function(response) {
        $('#successOp').fadeIn(400).delay(5000).fadeOut(400);
        // Replace tab
        $('#trainingList').load(location.href + " #trainingList", refreshTraining()) 
    },
    error : function( jqXHR, textStatus, errorThrown ){
        console.log( textStatus, errorThrown );
        $('#errorOp').fadeIn(400).delay(5000).fadeOut(400);
    },
    complete : function( jqXHR, textStatus ){
        console.log( textStatus );
    }
});
});

//****************deleteUser********************
$(document).on('click',".deleteUser", function (){
event.preventDefault();

$(this).text('Chargement');
$.ajax({
    url: BACKEND_URL + "admin/deleteUser?id=" + $(this).attr('id'),
    type: 'DELETE',
    headers: { Authorization: `Bearer ${ token }`},
    
    success: function(response) {
        $('#successOp').fadeIn(400).delay(5000).fadeOut(400);
        // replace tab
        $('#userList').load(location.href + " #userList", refreshUser())
    },
    error : function( jqXHR, textStatus, errorThrown ){
        $('#errorOp').fadeIn(400).delay(5000).fadeOut(400);
        console.log( textStatus, errorThrown );
    },
    complete : function( jqXHR, textStatus ){
        console.log( textStatus );
    }
});
});