//*****************************************************************************
//********************************** GET **************************************
//*****************************************************************************
var token = localStorage.getItem('MonToken');

//****************getMenu************************
$(document).ready(function(){
    $('#TrainingMenu').append('\
        <a class="nav-link active" id="training-tab" data-toggle="tab" href="#training" role="tab" aria-controls="Training" aria-selected="true">\
            <i class="fas fa-school nav-icon"></i>\
            <p>Participer à un cours</p>\
        </a>\
    ');
    $('#UserMenu').append('\
        <a class="nav-link" id="myTrainings-tab" data-toggle="tab" href="#myTrainings" role="tab" aria-controls="myTrainings" aria-selected="false">\
            <i class="fas fa-users nav-icon"></i>\
            <p>Mes cours</p>\
        </a>\
    ');
    $('#CalendarMenu').append('\
    <a class="nav-link" id="comment-tab" data-toggle="tab" href="#comment" role="tab" aria-controls="comment" aria-selected="false">\
        <i class="fas fa-calendar nav-icon"></i>\
        <p>Ajouter un commentaire</p>\
    </a>\
');
});

//****************getCurrentUser************************
$(document).ready(function () {

    //****************getTrainings************************
    $(document).ready(function () {
        $.ajax({
            url: BACKEND_URL + 'public/getTrainings',
            type: 'GET',
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
                        '<td><button id=' + training.id + 'type="button" class="getTraining btn btn-success btn-sm" data-toggle="modal" data-target="#myModalDisplayTraining"><i class="fas fa-eye"></i>Afficher</button>' +
                        '<button id=' + training.id + 'type="button" class="subscribe btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateTraining"><i class="fas fa-pen"></i>Participer</button></td>' +
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
                        "url": "../vendor/datatable.french.json"
                    }
                });
            },
            error: function (jqxhr) {
                $('#errorStudent').fadeIn(400).delay(6000).fadeOut(400);
            },
        });
    });

    //****************getTrainingById******************************

    $(document).on('click', ".getTraining", function (e) {
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

                $("p[name=subject]").empty().append(response.subject);
                $('p[name=start_training]').empty().append(new Date(start).toLocaleString());
                $('p[name=end_training]').empty().append(new Date(end).toLocaleString());
                $('p[name=training_description]').empty().append(response.description);

            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn(400).delay(6000).fadeOut(400);
            },
        });
    });

    //****************getMyTrainings******************************
    $(document).ready(function () {

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
                        '<td><button id=' + i + ' type="button" class="btn btn-success btn-sm" id="MonCours" data-toggle="modal" data-target="#myModalDisplayMyTraining"><i class="fas fa-eye"></i>Afficher</button></td>' +
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
                        "url": "../vendor/datatable.french.json"
                    }
                });
            },
            error: function (jqxhr) {
                //error alert
                $('#errorStudent').fadeIn(400).delay(6000).fadeOut(400);
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
                //success alert
                $('#successStudent').fadeIn(400).delay(6000).fadeOut(400);
                //clear fields
                $('input[name = title_comment]').val("");
                $('input[name = body_comment]').val("");
                //Modal closing
                $("#myModalAddCommentClose").trigger("click");
            },
            error: function (jqXhr) {
                //success alert
                $('#errorStudent').fadeIn(400).delay(6000).fadeOut(400);
                //clear fields
                $('input[name = title_comment]').val("");
                $('input[name = body_comment]').val("");
                //Modal closing
                $("#myModalAddCommentClose").trigger("click");
            },
        });
    });

    //*****************************************************************************
    //********************************** PUT *************************************
    //*****************************************************************************

    //****************subscribeTraining******************************

    $(document).on('click', ".subscribe", function (e) {
        e.preventDefault();
        console.log($(this).attr('id'));
        var data = {};
        data['id'] = $(this).attr('id');

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
                $('#successStudent').fadeIn(400).delay(6000).fadeOut(400);
                table = $('#tabstudents').DataTable();
                table.destroy();
                RefreshTab();
            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn(400).delay(6000).fadeOut(400);
            },
        });
    });



    //**************** updateCurrentUser ***************************
    $('#account-tab').click(function (e) {
        e.preventDefault();

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
                $('#errorStudent').fadeIn(400).delay(6000).fadeOut(400);
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
                $('#successStudent').fadeIn(400).delay(6000).fadeOut(400);
            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn(400).delay(6000).fadeOut(400);
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

//**************** refresh function ********************
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
                    "url": "../vendor/datatable.french.json"
                }
            });
        },
        error: function (jqxhr) {
            $('#errorStudent').fadeIn();
            $('#errorStudent').delay(6000).fadeOut();
        },
    });
}