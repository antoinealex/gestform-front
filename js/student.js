//*****************************************************************************
//********************************** GET **************************************
//*****************************************************************************
var token = localStorage.getItem('MonToken');

//****************getMenu************************
$(document).ready(function(){
    $('#TrainingMenu').append('\
        <a class="nav-link active" id="training-tab" data-toggle="tab" href="#Trainings" role="tab" aria-controls="Trainings" aria-selected="true">\
            <i class="fas fa-school nav-icon"></i>\
            <p>Participer à un cours</p>\
        </a>\
    ');
    $('#UserMenu').append('\
        <a class="nav-link" id="user-tab" data-toggle="tab" href="#myTrainings" role="tab" aria-controls="myTrainings" aria-selected="false">\
            <i class="fas fa-users nav-icon"></i>\
            <p>Mes cours</p>\
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

    //****************getAllTraining************************
    //$(document).on('click', '#home', function () {
    $(document).ready(function () {
        $.ajax({
            url: BACKEND_URL + 'training/getAllTraining',
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                Authorization: `Bearer ${ token }`
            },


            success: function (response) {
                console.log("success");

                $("#cours").empty();
                $.each(response, function (i, training) {
                    $("#cours").append('<tr>' +
                        '<td>' + training.subject + '</td>' +
                        '<td>' + new Date(training.startTraining.substring(0, 19)).toLocaleString() + '</td>' +
                        '<td>' + new Date(training.endTraining.substring(0, 19)).toLocaleString() + '</td>' +
                        '<td><button id=' + training.id + ' type="button" class="getTraining btn btn-success btn-sm" data-toggle="modal" data-target="#myModalDisplayTraining"><i class="fas fa-eye"></i> Afficher</button>'+
                        '<button id=' + training.id + ' type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateTraining"><i class="fas fa-pen"></i> Participer</button>' +
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
                $('#errorStudent').fadeIn();
                $('#errorStudent').delay(6000).fadeOut();
            },


        });
    });

    //****************getTrainingById******************************

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
                var chnStart = response.startTraining;
                var start = chnStart.substring(0, 19);

                var chnEnd = response.endTraining;
                var end = chnEnd.substring(0, 19);

                // $("h1[name=subject]").empty().append(response.subject);
                $("p[name=NameTeacher]").empty().append(response.teacher['lastname'] + " " + response.teacher['firstname']);
                $('p[name=start_training]').empty().append(new Date(start).toLocaleString());
                $('p[name=end_training]').empty().append(new Date(end).toLocaleString());
                $('p[name=max_student]').empty().append(response.maxStudent);
                $('p[name=price_per_student]').empty().append(response.pricePerStudent);
                $('p[name=training_description]').empty().append(response.trainingDescription);

            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn();
                $('#errorStudent').delay(6000).fadeOut();
            },
        })

    });

    //*****************************************************************************
    //********************************** POST *************************************
    //*****************************************************************************

    //****************addComments******************************

    $("#submit_c").click(function (e) {
        e.preventDefault();


        $.ajax({
            url: BACKEND_URL + 'comments/addComments',
            type: 'POST',
            data: {
                user_id: currentUser.id,
                title_comment: $('input[name = title_comment]').val(),
                body_comment: $('input[name = body_comment]').val(),
            },
            headers: {
                Authorization: `Bearer ${ token }`
            },
            success: function () {
                $('#successStudent').fadeIn();
                $('#successStudent').delay(6000).fadeOut();
                //location.reload(true);
            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn();
                $('#errorStudent').delay(6000).fadeOut();
            },
        });
    });


    //*****************************************************************************
    //********************************** PUT *************************************
    //*****************************************************************************

    //****************subscribeTraining******************************

    $(document).on('click', ".btn-primary", function (e) {
        e.preventDefault();
        console.log($(this).attr('id'));
        var data = {};
        data['id'] = $(this).attr('id');

        if (confirm("Etes-vous sûr de vouloir participer à ce Training ?")) {
            $.ajax({
                url: BACKEND_URL + 'student/subscribeTraining',
                type: 'PUT',
                dataType: 'json', //type de données qu'on attend en réponse du serveur
                contentType: "application/json",
                processData: false, //Définit à false permet d'eviter => application / x-www-form-urlencoded(par default)
                data: JSON.stringify(data), //Envoi des données en JSON
                headers: {
                    Authorization: `Bearer ${ token }`
                },

                success: function (response) {
                    $('#successStudent').fadeIn();
                    $('#successStudent').delay(6000).fadeOut();
                },
                error: function (jqXhr) {
                    $('#errorStudent').fadeIn();
                    $('#errorStudent').delay(6000).fadeOut();
                },
            });
        } else {
            //location.href = 'student.html';
        }

    });



    //****************updateCurrentUser***************************
    $(document).ready(function (e) {
        e.preventDefault();

        if (confirm("Etes-vous sûr de vouloir modifier votre profil ?")) {
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

                },
                error: function (jqXhr) {
                    $('#errorStudent').fadeIn();
                    $('#errorStudent').delay(6000).fadeOut();
                },
            })
        } else {
            location.reload(true);
            //location.href = 'student.html';
        }
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
                $('#successStudent').fadeIn();
                $('#successStudent').delay(6000).fadeOut();
                //location.reload(true);
            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn();
                $('#errorStudent').delay(6000).fadeOut();
            },
        });
    });

    //****************updatePassword*****************************
    $("#submit_mdp").click(function (e) {
        e.preventDefault();

        if ($("#oldpassword").val().length === 0) {
            $("#credsMissing").fadeIn();
        } else if ($("#newpassword").val().length === 0) {
            $("#credsMissing").fadeIn();
        } else if (!$("#newpassword").val().match(/^(?=.*[a-z])(?=.*[0-9]).{6,}$/i)) { //Regex=> 6 caractéres au moins une lettre et un chiffre
            $("#logerror").fadeIn();

        } else {
            $("#credsMissing").fadeOut();
            $("#logerror").fadeOut();

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
                    $('#successUpdatePassword').fadeIn();
                    //location.reload(true);
                },
                error: function (jqXhr) {
                    ('#errorUpdatePassword').fadeIn();
                    //location.reload(true);
                },
            });
        }
    });

});