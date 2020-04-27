//*****************************************************************************
//********************************** GET **************************************
//*****************************************************************************

//****************getAllTraining********************
$(document).ready(function () {

    var courses = $('#cours')
    var token = localStorage.getItem('MonToken');


    $.ajax({
        url: 'https://gestform.ei-bs.eu/training/getAllTraining',
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: {
            Authorization: `Bearer ${ token }`
        },
        success: function (training) {
            console.log("success GET")
            $.each(training, function (i, training) {
                var chnStart = training.startTraining;
                var start = chnStart.substring(0, 19);
                var chnEnd = training.endTraining;
                var end = chnEnd.substring(0, 19);
                courses.append('\
                <div class="accordion-toggle">' +
                    '<h3>' + training.subject + '</h3><br />' +
                    '<span class= "date"><i class="icon-calendar"></i>' + start + '</span><br />' +
                    '<span class= "date"><i class="icon-calendar"></i>' + end + '</span><br />' +
                    '<button id=' + training.id + ' type="button" class="getTraining btn btn-success btn-sm" data-toggle="modal" data-target="#myModalGetTraining">Afficher</button>' +
                    '<button id=' + training.id + ' type="button" class="updateTraining btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateTraining">Editer</button>' +
                    '<button id=' + training.id + ' type="button" class="deleteTraining btn btn-danger btn-sm">Supprimer</button><br />' +
                    '</div>'
                );
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log(textStatus);
        }
    });
});


//****************getAllUser********************
$(document).ready(function () {

    var student = $('#eleves')
    var token = localStorage.getItem('MonToken');

    $.ajax({
        url: 'https://gestform.ei-bs.eu/admin/getAllUser',
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: {
            Authorization: `Bearer ${ token }`
        },
        success: function (user) {
            console.log("success GET")
            $.each(user, function (i, user) {
                student.append('\
                <div class="accordion-toggle">' +
                    '<h3>' + user.firstname + ' ' + user.lastname + '</h3><br />' +
                    '<span class="id">id n°:' + user.id + '</span><br>' +
                    '<span class="text">' + user.phone + '</span><br>' +
                    '<span class="text">' + user.email + '</span><br>' +
                    '<button id=' + user.id + ' type="button" class="getUser btn btn-success btn-sm" data-toggle="modal" data-target="#myModalGetUser">Afficher</button>' +
                    '<button id=' + user.id + ' type="button" class="updateUser btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateUser">Editer</button>' +
                    '<button id=' + user.id + ' type="button" class="deleteUser btn btn-danger btn-sm">Supprimer</button><br />' +
                    '</div>'
                )
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log(textStatus);
        }
    });
});

//****************getTrainingById********************
$(document).on('click', ".getTraining", function () {
    var token = localStorage.getItem('MonToken');
    event.preventDefault();
    var id = $(this).attr('id');
    $.ajax({
        url: 'https://gestform.ei-bs.eu/training/getTrainingById?id=' + id,
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: {
            Authorization: `Bearer ${ token }`
        },

        success: function (training) {
            console.log(id);
            $("p[name=teacher_id]").append(training.teacher["firstname"] + " " + training.teacher["lastname"]);
            $('p[name=start_training]').append(training.startTraining);
            $('p[name=end_training]').append(training.endTraining);
            $('p[name=max_student]').append(training.maxStudent);
            $('p[name=price_per_student]').append(training.pricePerStudent);
            $('p[name=training_description]').append(training.trainingDescription);
            $('p[name=subject]').append(training.subject);
            // $.each(user, function(i, student){
            //     $('p[name=student_list]').append(student.participants[student.participants["firstname"] + " " + student.participants["lastname"]])
            // })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log(textStatus);
        }
    });
});

//****************getUSerById********************
$(document).on('click', ".getUser", function () {
    var token = localStorage.getItem('MonToken');
    //event.preventDefault();
    var id = $(this).attr('id');
    $.ajax({
        url: 'https://gestform.ei-bs.eu/admin/getUserByID?id=' + id,
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: {
            Authorization: `Bearer ${ token }`
        },

        success: function (user) {
            console.log(id);
            $("p[name=nom]").append(user.firstname + " " + user.lastname);
            $('p[name=role]').append(user.roles);
            $('p[name=email]').append(user.email);
            $('p[name=phone]').append(user.phone);
            $('p[name=adress]').append(user.address + " " + user.city + " " + user.postcode);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log(textStatus);
        }
    });
});

//******************************************************************************
//********************************** POST **************************************
//******************************************************************************

//****************addTraining********************
$("#submit_t").click(function () {
    event.preventDefault();

    var token = localStorage.getItem('MonToken');

    data = {};

    $.ajax({
        url: 'https://gestform.ei-bs.eu/training/addTraining',
        type: 'POST',
        headers: {
            Authorization: `Bearer ${ token }`
        },
        data: {
            teacher_id: $('input[name=teacher_id]').val(),
            start_training: $('input[name=start_training]').val(),
            end_training: $('input[name=end_training]').val(),
            max_student: $('input[name=max_student]').val(),
            price_per_student: $('input[name=price_per_student]').val(),
            training_description: $('input[name=training_description]').val(),
            subject: $('input[name=subject]').val()
        },
        success: function () {
            alert('Le cours a été ajouté avec succés !');
            location.reload(true);
            //$('.courses').load("../gestform-front/course.html .courses") //insert la page entiere dans la div

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log(textStatus);
        }
    });
});

//****************addUser********************
$("#submit_s").click(function () {
    event.preventDefault();
    var token = localStorage.getItem('MonToken');
    data = {};

    $.ajax({
        url: 'https://gestform.ei-bs.eu/admin/createUser',
        type: 'POST',
        headers: {
            Authorization: `Bearer ${ token }`
        },
        data: {
            email: $('input[name=email]').val(),
            roles: $('select[name=roles]').val(),
            password: $('input[name=password]').val(),
            lastname: $('input[name=lastname]').val(),
            firstname: $('input[name=firstname]').val(),
            phone: $('input[name=phone]').val(),
            address: $('input[name=address]').val(),
            postcode: $('input[name=postcode]').val(),
            city: $('input[name=city]').val()
        },
        success: function () {
            alert('L\'utilisateur a été ajouté avec succés !');
            location.reload(true);
            //$('.courses').load("../gestform-front/course.html .courses") //insert la page entiere dans la div

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log(textStatus);
        }
    });
});

//*****************************************************************************
//********************************** PUT **************************************
//*****************************************************************************

//****************updateTraining********************

$(document).on('click', ".updateTraining", function () {
    var token = localStorage.getItem('MonToken');
    event.preventDefault();
    var id = $(this).attr('id');

    $.ajax({
        url: 'https://gestform.ei-bs.eu/training/getTrainingById?id=' + id,
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: {
            Authorization: `Bearer ${ token }`
        },

        success: function (training) {
            console.log(id);
            // if (training.teacher_id) {
            //     $("option[name=teacher_name]").val(training.teacher["firstname"] + " " + training.teacher["lastname"]);
            // };
            //Formater la date
            var chnStart = training.startTraining;
            var start = chnStart.substring(0, 19);
            var chnEnd = training.endTraining;
            var end = chnEnd.substring(0, 19);

            $('input[name=trainingId]').val(training.id)
            $('input[name=teacher]').val( /*training.teacher['firstname'] + " " + training.teacher['lastname']*/ training.teacher_id);
            $('input[name=start_training]').val(start);
            $('input[name=end_training]').val(end);
            $('input[name=max_student]').val(training.maxStudent);
            $('input[name=price_per_student]').val(training.pricePerStudent);
            $('input[name=training_description]').val(training.trainingDescription);
            $('input[name=subject]').val(training.subject);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log(textStatus);
        }
    });
    $(document).on('click', "#submit_u", function () {
        event.preventDefault();
        trainingData = {
            "id": $('input[name=trainingId]').val(),
            "teacher_id": $('input[name=teacher]').val(),
            "startTraining": $('input[name=start_training]').val(),
            "endTraining": $('input[name=end_training]').val(),
            "maxStudent": $('input[name=max_student]').val(),
            "pricePerStudent": $('input[name=price_per_student]').val(),
            "trainingDescription": $('input[name=training_description]').val(),
            "subject": $('input[name=subject]').val()
        };

        $.ajax({
            url: 'https://gestform.ei-bs.eu/admin/updateTraining',
            type: 'PUT',
            dataType: 'json', //text
            contentType: "application/json",
            processData: false,
            headers: {
                Authorization: `Bearer ${ token }`
            },
            data: JSON.stringify(trainingData),
            success: function () {
                console.log(training.id);
                location.reload(true);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus, errorThrown);
            },
            complete: function (jqXHR, textStatus) {
                console.log(textStatus);
            }
        });
    });
});

//****************updateUser********************

$(document).on('click', ".updateUser", function () {
    var token = localStorage.getItem('MonToken');
    event.preventDefault();
    var id = $(this).attr('id');

    $.ajax({
        url: 'https://gestform.ei-bs.eu/admin/getUserByID?id=' + id,
        type: 'GET',
        datatype: 'JSON',
        contentType: "application/json",
        headers: {
            Authorization: `Bearer ${ token }`
        },

        success: function (user) {
            console.log(id);

            $('input[name=userId]').val(id)
            $('input[name=lastname]').val(user.lastname);
            $('input[name=firstname]').val(user.firstname);
            $('input[name=roles]').val(user.roles);
            $('input[name=email]').val(user.email)
            //$('input[name=password]').val(user.password);
            $('input[name=phone]').val(user.phone);
            $('input[name=address]').val(user.address);
            $('input[name=postcode]').val(user.postcode);
            $('input[name=city]').val(user.city);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log(textStatus);
        }
    });
    $(document).on('click', "#submit_e", function () {
        event.preventDefault();
        userData = {
            id: $('input[name=userId]').val(),
            lastname: $('input[name=lastname]').val(),
            firstname: $('input[name=firstname]').val(),
            roles: $('input[name=roles]').val(),
            email: $('input[name=email]').val(),
            //password: $('input[name=password]').val(),
            phone: $('input[name=phone]').val(),
            address: $('input[name=address]').val(),
            postcode: $('input[name=postcode]').val(),
            city: $('input[name=city]').val()
        };

        $.ajax({
            url: 'https://gestform.ei-bs.eu/admin/updateUser',
            type: 'PUT',
            dataType: 'json', //text
            contentType: "application/json",
            processData: false,
            headers: {
                Authorization: `Bearer ${ token }`
            },
            data: JSON.stringify(userData),
            success: function () {
                console.log(user.id);
                //location.reload(true);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus, errorThrown);
            },
            complete: function (jqXHR, textStatus) {
                console.log(textStatus);
            }
        });
    });
});


//******************************************************************************
//********************************** DELETE ************************************
//******************************************************************************

//****************deleteTraining********************
$(document).on('click', ".deleteTraining", function () {
    var token = localStorage.getItem('MonToken');
    event.preventDefault();

    $(this).text('Chargement');
    $.ajax({
        url: 'https://gestform.ei-bs.eu/admin/deleteTraining?id=' + $(this).attr('id'),
        type: 'DELETE',
        headers: {
            Authorization: `Bearer ${ token }`
        },

        success: function (response) {
            location.reload(true);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log(textStatus);
        }
    });
});

//****************deleteUser********************
$(document).on('click', ".deleteUser", function () {
    var token = localStorage.getItem('MonToken');
    event.preventDefault();

    $(this).text('Chargement');
    $.ajax({
        url: 'https://gestform.ei-bs.eu/admin/deleteUser?id=' + $(this).attr('id'),
        type: 'DELETE',
        headers: {
            Authorization: `Bearer ${ token }`
        },

        success: function (response) {
            location.reload(true);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log(textStatus);
        }
    });
});