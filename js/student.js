//*****************************************************************************
//********************************** GET **************************************
//*****************************************************************************
var token = localStorage.getItem('MonToken');
//****************getCurrentUser************************
$(document).ready(function () {

    //****************getTrainings************************
    //$(document).on('click', '#home', function () {
    $(document).ready(function () {
        $.ajax({
            url: BACKEND_URL + 'public/getTrainings',
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
                        '<td>' + new Date(training.start.substring(0, 19)).toLocaleString() + '</td>' +
                        '<td>' + new Date(training.end.substring(0, 19)).toLocaleString() + '</td>' +
                        '<td><button id=' + training.id + ' type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#myModalDisplayTraining"><i class="fas fa-eye"></i> Afficher</button> <button id=' + training.id + ' type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateTraining"><i class="fas fa-pen"></i> Participer</button></td>' +
                        '</tr>');
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
                        "url": "vendor/datatable.french.json"
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

    $(document).on('click', ".btn-success", function (e) {
        e.preventDefault();

        console.log($(this).attr('id'));

        $.ajax({
            url: BACKEND_URL + 'public/getTrainingById?id=' + $(this).attr('id'),
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                Authorization: `Bearer ${ token }`
            },

            success: function (response) {
                var chnStart = response.start;
                var start = chnStart.substring(0, 19);

                var chnEnd = response.end;
                var end = chnEnd.substring(0, 19);

                $("h1[name=subject]").empty().append(response.subject);
                //$("p[name=NameTeacher]").empty().append(response.teacher['lastname'] + " " + response.teacher['firstname']);
                $('p[name=start_training]').empty().append(new Date(start).toLocaleString());
                $('p[name=end_training]').empty().append(new Date(end).toLocaleString());
                //$('p[name=max_student]').empty().append(response.maxStudent);
                //$('p[name=price_per_student]').empty().append(response.pricePerStudent);
                $('p[name=training_description]').empty().append(response.description);

            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn();
                $('#errorStudent').delay(6000).fadeOut();
            },
        });

    });

    //****************getMyTrainings******************************

    //$(document).on('click', ".btn-success", function (e) {
    $(document).ready(function () {


        //console.log($(this).attr('id'));

        $.ajax({
            url: BACKEND_URL + 'student/getMyTrainings',
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
                    $("#students").append('<tr>' +
                        '<td>' + training.subject + '</td>' +
                        '<td>' + new Date(training.startDatetime.substring(0, 19)).toLocaleString() + '</td>' +
                        '<td>' + new Date(training.endDatetime.substring(0, 19)).toLocaleString() + '</td>' +
                        '<td><button id=' + i + ' type="button" class="btn btn-success btn-sm" id="MonCours" data-toggle="modal" data-target="#myModalDisplayMyTraining"><i class="fas fa-eye"></i> Afficher</button></td>' +
                        '</tr>');
                });
                $('#tabstudents').DataTable({
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
                $('#errorStudent').fadeIn();
                $('#errorStudent').delay(6000).fadeOut();
            },


        });

    });

    $(document).on('click', ".btn-success", function (e) {
        e.preventDefault();

        console.log($(this).attr('id'));

        $.ajax({
            url: BACKEND_URL + 'public/getTrainingById?id=' + $(this).attr('id'),
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                Authorization: `Bearer ${ token }`
            },

            success: function (response) {
                var chnStart = response.start;
                var start = chnStart.substring(0, 19);

                var chnEnd = response.end;
                var end = chnEnd.substring(0, 19);

                $("h1[name=Subject]").empty().append(response.subject);
                //$("p[name=Teacher]").empty().append(response.teacher['lastname'] + " " + response.teacher['firstname']);
                $('p[name=startTraining]').empty().append(new Date(start).toLocaleString());
                $('p[name=endTraining]').empty().append(new Date(end).toLocaleString());
                $('p[name=trainingDescription]').empty().append(response.description);

            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn();
                $('#errorStudent').delay(6000).fadeOut();
            },
        });

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

                $('input[name = title_comment]').val("");
                $('input[name = body_comment]').val("");

                $("#myModalAddCommentClose").trigger("click");
                //location.reload(true);
            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn();
                $('#errorStudent').delay(6000).fadeOut();

                $('input[name = title_comment]').val("");
                $('input[name = body_comment]').val("");

                $("#myModalAddCommentClose").trigger("click");
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

        // if (confirm("Etes-vous sûr de vouloir participer à ce Training ?")) {
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
                table = $('#tabstudents').DataTable();
                table.destroy();
                RefreshTab();
            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn();
                $('#errorStudent').delay(6000).fadeOut();
            },
        });
        // } else {
        //     //location.href = 'student.html';
        // }

    });



    //****************updateCurrentUser***************************
    $("#modalUpdateProfil").click(function (e) {
        e.preventDefault();

        // if (confirm("Etes-vous sûr de vouloir modifier votre profil ?")) {
        $.ajax({
            url: BACKEND_URL + 'user/getCurrentUser',
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                Authorization: `Bearer ${ token }`
            },

            success: function (response) {

                $("input[name=email]").val(response.email);
                $('input[name=lastname]').val(response.lastname);
                $('input[name=firstname]').val(response.firstname);
                $('input[name=phone]').val(response.phone);
                $('input[name=address]').val(response.address);
                $('input[name=postcode]').val(response.postcode);
                $('input[name=city]').val(response.city);

            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn();
                $('#errorStudent').delay(6000).fadeOut();
            },
        })
        // } else {
        //     location.reload(true);
        //     //location.href = 'student.html';
        // }
    });

    $("#submit_up").click(function (e) {
        e.preventDefault();
        data = {
            "email": $("input[name=email]").val(),
            "lastname": $('input[name=lastname]').val(),
            "firstname": $('input[name=firstname]').val(),
            "phone": $('input[name=phone]').val(),
            "address": $('input[name=address]').val(),
            "postcode": $('input[name=postcode]').val(),
            "city": $('input[name=city]').val()
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

                success: function (response) {
                    $("#successUpdatePassword").fadeIn().delay(6000).fadeOut();
                    $("#oldpassword").val("");
                    $("#newpassword").val("");
                    $("#myModalUpdatePasswordClose").trigger("click");

                    //location.reload(true);
                },
                error: function (jqXhr) {
                    $('#errorUpdatePassword').fadeIn().delay(6000).fadeOut();
                    $("#oldpassword").val("");
                    $("#newpassword").val("");
                    $("#myModalUpdatePasswordClose").trigger("click");

                    //location.reload(true);
                },
            });
        }
    });

});

//*******************************FONCTIONS**************************************
function RefreshTab() {

    $.ajax({
        url: BACKEND_URL + 'student/getMyTrainings',
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
                $("#students").append('<tr>' +
                    '<td>' + training.subject + '</td>' +
                    '<td>' + new Date(training.startDatetime.substring(0, 19)).toLocaleString() + '</td>' +
                    '<td>' + new Date(training.endDatetime.substring(0, 19)).toLocaleString() + '</td>' +
                    '<td><button id=' + i + ' type="button" class="btn btn-success btn-sm" id="MonCours" data-toggle="modal" data-target="#myModalDisplayMyTraining"><i class="fas fa-eye"></i> Afficher</button></td>' +
                    '</tr>');
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
            $('#errorStudent').fadeIn();
            $('#errorStudent').delay(6000).fadeOut();
        },


    });
}