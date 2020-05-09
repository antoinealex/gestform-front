//*****************************************************************************
//********************************** GET **************************************
//*****************************************************************************
var token = localStorage.getItem('MonToken');

//****************getMenu************************
$(document).ready(function(){
    $('#TrainingMenu').append('\
        <a class="nav-link active" id="training-tab" data-toggle="tab" href="#MyTrainings" role="tab" aria-controls="training" aria-selected="true">\
            <i class="fas fa-school nav-icon"></i>\
            <p>Cours</p>\
        </a>\
    ');
    $('#UserMenu').append('\
        <a class="nav-link" id="user-tab" data-toggle="tab" href="#MyStudents" role="tab" aria-controls="user" aria-selected="false">\
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


//****************getCurrentUser************************
$(document).ready(function () {

    //****************getMyTrainings*****************************
    $(document).ready(function () {
        $.ajax({
            url: BACKEND_URL + 'teacher/getMyTrainings',
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                Authorization: `Bearer ${ token }`
            },
            success: function (response) {
                console.log("success");
                //$("#cours").empty();
                $.each(response, function (i, training) {
                    $("#cours").append('<tr>' +
                        '<td>' + training.subject + '</td>' +
                        '<td>' + new Date(training.startDatetime).toLocaleString() + '</td>' +
                        '<td>' + new Date(training.endDatetime).toLocaleString() + '</td>' +
                        '<td><button id=' + i + ' type="button" class="getTraining btn btn-success btn-sm" data-toggle="modal" data-target="#myModalDisplayTeacher"><i class="fas fa-eye"></i> Afficher</button>' +
                        '<button id=' + i + ' type="button" class="updateTraining btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateTraining"><i class="fas fa-pen"></i> Editer</button>' +
                        '</tr>')
                });
                $('#tabcours').DataTable({
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
            error: function (jqxhr) {
                $('#errorTeacher').fadeIn(400).delay(6000).fadeOut(400);
            },
        });
    });


    //****************getTrainingById*****************************
    $(document).on('click', ".getTraining", function (e) {
        e.preventDefault();
        console.log($(this).attr('id'));

        $.ajax({
            url: BACKEND_URL + 'training/getTrainingById?id=' + $(this).attr('id'),
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                Authorization: `Bearer ${ token }`
            },
            success: function (response) {
                $("h1[name=NameTeacher]").empty().append(response.teacher['lastname'] + " " + response.teacher['firstname']);
                $("p[name=training_id]").empty().append(response.id);
                $('p[name=start_training]').empty().append(new Date(response.startTraining.substring(0, 19)).toLocaleString());
                $('p[name=end_training]').empty().append(new Date(response.endTraining.substring(0, 19)).toLocaleString());
                $('p[name=max_student]').empty().append(response.maxStudent);
                $('p[name=price_per_student]').empty().append(response.pricePerStudent);
                $('p[name=training_description]').empty().append(response.trainingDescription);
                $('p[name=subject]').empty().append(response.subject);
            },
            error: function (jqXhr) {
                $('#errorTeacher').fadeIn(400).delay(6000).fadeOut(400);
            },
        });
    });

    //****************getTrainingById (pour récuperer les Students)***********************
    $(document).ready(function () {
        $.ajax({
            url: BACKEND_URL + 'teacher/getMyTrainings',
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                Authorization: `Bearer ${ token }`
            },
            success: function (response) {
                console.log("success");
                $("#students").empty();
                $.each(response, function (i, training) {
                    $.ajax({
                        url: BACKEND_URL + 'training/getTrainingById?id=' + i,
                        type: 'GET',
                        dataType: 'json',
                        contentType: 'application/json',
                        headers: {
                            Authorization: `Bearer ${ token }`
                        },
                        success: function (response) {
                            console.log("success");
                            $.each(response.participants, function (i, student) {
                                $("#students").append('<tr>' +
                                    '<td>' + student.firstname + '</td>' +
                                    '<td>' + student.lastname + '</td>' +
                                    '<td>' + response.subject + '</td>' +
                                    '</tr>')
                            });
                            $('#tabstudents').DataTable({
                                "retrieve": true,
                                "paging": true,
                                "lengthChange": true,
                                "searching": true,
                                "ordering": true,
                                "info": true,
                                "autoWidth": false,
                                "responsive": true,
                                "language": {
                                    "url": "vendor/datatable.french.json"
                                }
                            });
                        },
                        error: function (jqxhr) {
                            $('#errorTeacher').fadeIn(400).delay(6000).fadeOut(400);
                        },
                    });
                });
            },
            error: function (jqxhr) {
                $('#errorTeacher').fadeIn(400).delay(6000).fadeOut(400);
            },
        });
    });

    //*****************************************************************************
    //********************************** POST *************************************
    //*****************************************************************************

    //****************addTraining**************************
    $(document).ready(function (e) {
        e.preventDefault();

        console.log(currentUser.id);
        $.ajax({
            url: BACKEND_URL + 'training/addTraining',
            type: 'POST',
            data: {
                teacher_id: currentUser.id,
                start_training: $('input[name = start_training]').val(),
                end_training: $('input[name = end_training]').val(),
                max_student: $('input[name = max_student]').val(),
                price_per_student: $('input[name = price_per_student]').val(),
                training_description: $('input[name = training_description]').val(),
                subject: $('input[name = subject]').val()
            },
            headers: {
                Authorization: `Bearer ${ token }`
            },
            success: function () {
                $('#successTeacher').fadeIn();
                $('#successTeacher').delay(6000).fadeOut();

                $('input[name = start_training]').val("");
                $('input[name = end_training]').val("");
                $('input[name = max_student]').val("");
                $('input[name = price_per_student]').val("");
                $('input[name = training_description]').val("");
                $('input[name = subject]').val("");

                table = $('#tabcours').DataTable();
                table.destroy();
                RefreshTab();
            },
            error: function (jqXhr) {
                $('#errorTeacher').fadeIn(400).delay(6000).fadeOut(400);
            },
        });
    });

    //*****************************************************************************
    //********************************** PUT **************************************
    //*****************************************************************************

    //****************updateTraining*************************

    $(document).on('click', ".updateTraining", function (e) {
        e.preventDefault();
        console.log($(this).attr('id'));

        $.ajax({
            url: BACKEND_URL + 'training/getTrainingById?id=' + $(this).attr('id'),
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                Authorization: `Bearer ${ token }`
            },

            success: function (response) {
                var chnStart = response.startTraining;
                var start = chnStart.substring(0, 19);

                var chnEnd = response.endTraining;
                var end = chnEnd.substring(0, 19);

                $("input[name=editTrainingId]").val(response.id);
                $('input[name=editStart_training]').val(start);
                $('input[name=editEnd_training]').val(end);
                $('input[name=editMax_student]').val(response.maxStudent);
                $('input[name=editPrice_per_student]').val(response.pricePerStudent);
                $('input[name=editTraining_description]').val(response.trainingDescription);
                $('input[name=editSubject]').val(response.subject);

                $("#submit_u").click(function (e) {
                    e.preventDefault();
                    data = {
                        "id": $('input[name=editTrainingId]').val(),
                        "startTraining": $('input[name=editStart_training]').val(),
                        "endTraining": $('input[name=editEnd_training]').val(),
                        "maxStudent": $('input[name=editMax_student]').val(),
                        "pricePerStudent": $('input[name=editPrice_per_student]').val(),
                        "trainingDescription": $('input[name=editTraining_description]').val(),
                        "subject": $('input[name=start_training]').val()
                    };

                    $.ajax({
                        url: BACKEND_URL + 'teacher/updateTraining',
                        type: 'PUT',
                        dataType: 'json', //type de données qu'on attend en réponse du serveur
                        contentType: "application/json",
                        processData: false, //Définit à false permet d'eviter => application / x-www-form-urlencoded(par default)
                        data: JSON.stringify(data),
                        headers: {
                            Authorization: `Bearer ${ token }`
                        },

                        success: function () {
                            $('#successTeacher').fadeIn(400).delay(6000).fadeOut(400);
                            $("#myModalUpdateTrainingClose").trigger("click");
                            table = $('#tabcours').DataTable();
                            table.destroy();
                            RefreshTab();
                        },
                        error: function (jqXhr) {
                            $('#errorTeacher').fadeIn(400).delay(6000).fadeOut(400);
                        },
                    });
                });

            },
            error: function (jqXhr) {
                $('#errorTeacher').fadeIn(400).delay(6000).fadeOut(400);
            },
        });
    });

    //****************updateCurrentUser*****************************
    $(document).on('click', "#account-tab", function (e) {

        $.ajax({
            url: BACKEND_URL + 'user/getCurrentUser',
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
                    };

                    $.ajax({
                        url: BACKEND_URL + 'user/updateCurrentUser',
                        type: 'PUT',
                        dataType: 'json', //type de données qu'on attend en réponse du serveur
                        contentType: "application/json",
                        processData: false, //Définit à false permet d'eviter => application / x-www-form-urlencoded(par default)
                        data: JSON.stringify(data),
                        headers: {
                            Authorization: `Bearer ${ token }`
                        },

                        success: function () {
                            $('#successTeacher').fadeIn(400).delay(6000).fadeOut(400);
                        },
                        error: function (jqXhr) {
                            $('#errorTeacher').fadeIn(400).delay(6000).fadeOut(400);
                        },
                    });
                });
            },
            error: function (jqXhr) {
                $('#errorTeacher').fadeIn(400).delay(6000).fadeOut(400);
            },
        });
    });

    //****************updatePassword*****************************
    $(document).ready(function (e) {
        e.preventDefault();

        if ($("#oldpassword").val().length === 0) {
            $("#credsMissing").fadeIn().delay(4000).fadeOut();
        } else if ($("#newpassword").val().length === 0) {
            $("#credsMissing").fadeIn().delay(4000).fadeOut();
        } else if (!$("#newpassword").val().match(/^(?=.*[a-z])(?=.*[0-9]).{6,}$/i)) { //Regex=> 6 caractéres au moins une lettre et un chiffre
            $("#oldpassword").val("");
            $("#newpassword").val("");
            $("#logerror").fadeIn().delay(4000).fadeOut();

        } else {
            $("#credsMissing").fadeOut();
            $("#logerror").fadeOut();

            data = {
                "oldPassword": $("input[name=oldpassword]").val(),
                "newPassword": $('input[name=newpassword]').val(),
            };

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
                    $("#successUpdatePassword").fadeIn(400).delay(6000).fadeOut(400);
                    $("#oldpassword").val("");
                    $("#newpassword").val("");
                },
                error: function (jqXhr) {
                    $('#errorUpdatePassword').fadeIn(400).delay(6000).fadeOut(400);
                    $("#oldpassword").val("");
                    $("#newpassword").val("");
                },
            });
        }
    });
});

//******************************************************************************
//********************************* FUNCTION ***********************************
//******************************************************************************

function RefreshTab() {

    $.ajax({
        url: BACKEND_URL + 'teacher/getMyTrainings',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            Authorization: `Bearer ${ token }`
        },
        success: function (response) {
            console.log("success");
            //$("#cours").empty();
            $.each(response, function (i, training) {
                $("#cours").append('<tr>' +
                    '<td>' + training.subject + '</td>' +
                    '<td>' + new Date(training.startDatetime).toLocaleString() + '</td>' +
                    '<td>' + new Date(training.endDatetime).toLocaleString() + '</td>' +
                    '<td><button id=' + i + ' type="button" class="getTraining btn btn-success btn-sm" data-toggle="modal" data-target="#myModalDisplayTeacher"><i class="fas fa-eye"></i> Afficher</button>' +
                    '<button id=' + i + ' type="button" class="updateTraining btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateTraining"><i class="fas fa-pen"></i> Editer</button>' +
                    '</tr>')
            });
            $('#tabcours').DataTable({
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
        error: function (jqxhr) {
            $('#errorTeacher').fadeIn(400).delay(6000).fadeOut(400);
        },
    });
}