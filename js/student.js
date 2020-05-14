//*****************************************************************************
//********************************** GET **************************************
//*****************************************************************************
var token = localStorage.getItem('MonToken');
//****************getCurrentUser************************
$(document).ready(function () {

    //****************getTrainings************************

    $(document).ready(function () {

        //Ajax pour récupérer l'id des trainings aux quels participe déja le stdudent et cacher le btn participer
        // $.ajax({
        //     url: BACKEND_URL + 'student/getMyTrainings',
        //     type: 'get',
        //     dataType: 'json',
        //     contentType: 'application/json',
        //     headers: {
        //         Authorization: `Bearer ${ token }`
        //     },


        //     success: function (response) {

        //         idTraining = [];
        //         j = 0;
        //         $.each(response, function (i, training) {
        //             idTraining[j] = i;
        //             j++;
        //         });
        //         console.log(idTraining);

        //     },
        //     error: function (jqxhr) {
        //         $('#errorStudent').fadeIn(400);
        //         $('#errorStudent').delay(4000).fadeOut(400);
        //     },


        // });



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

                //index = 0;
                $.each(response, function (i, training) {

                    // if (idTraining[index] != training.id) {
                    $("#cours").append('<tr>' +
                        '<td>' + training.subject + '</td>' +
                        '<td>' + new Date(training.start).toLocaleString() + '</td>' +
                        '<td>' + new Date(training.end).toLocaleString() + '</td>' +
                        '<td><button id=' + training.id + ' type="button" class="btn btn-success training btn-sm" data-toggle="modal" data-target="#myModalDisplayTraining"><i class="fas fa-eye"></i> Afficher</button> <button id=' + training.id + "_particip" + ' type="button" class="btn btn-primary participer btn-sm"><i class="fas fa-pen"></i> Participer</button></td>' +
                        '</tr>');
                    // } else index++;


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
                $('#errorStudent').fadeIn(400);
                $('#errorStudent').delay(4000).fadeOut(400);
            },


        });
    });

    //****************getTrainingById******************************

    $(document).on('click', ".training", function (e) {
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

                var start = response.start;


                var end = response.end;

                $("h1[name=subject]").empty().append(response.subject);
                $("p[name=NameTeacher]").empty().append(response.teacher['lastname'] + " " + response.teacher['firstname']);
                $('p[name=start_training]').empty().append(new Date(start).toLocaleString());
                $('p[name=end_training]').empty().append(new Date(end).toLocaleString());
                $('p[name=max_student]').empty().append(response.maxstudent);
                $('p[name=price_per_student]').empty().append(response.price);
                $('p[name=training_description]').empty().append(response.description);

            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn(400);
                $('#errorStudent').delay(4000).fadeOut(400);
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
                        '<td>' + new Date(training.startDatetime).toLocaleString() + '</td>' +
                        '<td>' + new Date(training.endDatetime).toLocaleString() + '</td>' +
                        '<td><button id=' + i + ' type="button" class="btn btn-success moncours btn-sm" data-toggle="modal" data-target="#myModalDisplayMyTraining"><i class="fas fa-eye"></i> Afficher</button></td>' +
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
                $('#errorStudent').fadeIn(400);
                $('#errorStudent').delay(4000).fadeOut(400);
            },


        });

    });

    $(document).on('click', ".moncours", function (e) {
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

                var start = response.start;


                var end = response.end;
                console.log(response.subject);
                $("h1[name=Subject]").empty().append(response.subject);
                $("p[name=Teacher]").empty().append(response.teacher['lastname'] + " " + response.teacher['firstname']);
                $('p[name=startTraining]').empty().append(new Date(start).toLocaleString());
                $('p[name=endTraining]').empty().append(new Date(end).toLocaleString());
                $('p[name=trainingDescription]').empty().append(response.description);

            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn(400);
                $('#errorStudent').delay(4000).fadeOut(400);
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
                $('#successStudent').fadeIn(400);
                $('#successStudent').delay(4000).fadeOut(400);

                $('input[name = title_comment]').val("");
                $('input[name = body_comment]').val("");

                $("#myModalAddCommentClose").trigger("click");

            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn(400);
                $('#errorStudent').delay(4000).fadeOut(400);

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
        $("#" + $(this).attr('id')).hide();
        console.log($(this).attr('id').replace("_particip", ""));
        var data = {
            'id': $(this).attr('id').replace("_particip", "")
        };


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
                table = $('#tabstudents').DataTable();
                table.destroy();
                RefreshTab();
                // tab = $('#tabcours').DataTable();
                // tab.destroy();
                // RefreshTabCours();

                $('#successStudent').fadeIn(400);
                $('#successStudent').delay(4000).fadeOut(400);



            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn(400);
                $('#errorStudent').delay(4000).fadeOut(400);
            },
        });

    });



    //****************updateCurrentUser***************************
    $("#modalUpdateProfil").click(function (e) {
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

                $("input[name=email]").val(response.email);
                $('input[name=lastname]').val(response.lastname);
                $('input[name=firstname]').val(response.firstname);
                $('input[name=phone]').val(response.phone);
                $('input[name=address]').val(response.address);
                $('input[name=postcode]').val(response.postcode);
                $('input[name=city]').val(response.city);

            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn(400);
                $('#errorStudent').delay(4000).fadeOut(400);

            },
        });

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
                $('#successStudent').fadeIn(400);
                $('#successStudent').delay(4000).fadeOut(400);
                $('#myModalUpdateProfilClose').trigger('click');

            },
            error: function (jqXhr) {
                $('#errorStudent').fadeIn(400);
                $('#errorStudent').delay(4000).fadeOut(400);
                $('#myModalUpdateProfilClose').trigger('click');
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
                    $("#successUpdatePassword").fadeIn(400).delay(4000).fadeOut(400);
                    $("#oldpassword").val("");
                    $("#newpassword").val("");
                    $("#myModalUpdatePasswordClose").trigger("click");

                },
                error: function (jqXhr) {
                    $('#errorUpdatePassword').fadeIn(400).delay(4000).fadeOut(400);
                    $("#oldpassword").val("");
                    $("#newpassword").val("");
                    $("#myModalUpdatePasswordClose").trigger("click");

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
                    '<td>' + new Date(training.startDatetime).toLocaleString() + '</td>' +
                    '<td>' + new Date(training.endDatetime).toLocaleString() + '</td>' +
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

// function RefreshTabCours() {
//     $.ajax({
//         url: BACKEND_URL + 'student/getMyTrainings',
//         type: 'get',
//         dataType: 'json',
//         contentType: 'application/json',
//         headers: {
//             Authorization: `Bearer ${ token }`
//         },


//         success: function (response) {

//             idTraining = [];
//             j = 0;
//             $.each(response, function (i, training) {
//                 idTraining[j] = i;
//                 j++;
//             });
//             console.log(idTraining);

//         },
//         error: function (jqxhr) {
//             $('#errorStudent').fadeIn();
//             $('#errorStudent').delay(6000).fadeOut();
//         },


//     });



//     $.ajax({
//         url: BACKEND_URL + 'public/getTrainings',
//         type: 'get',
//         dataType: 'json',
//         contentType: 'application/json',
//         headers: {
//             Authorization: `Bearer ${ token }`
//         },


//         success: function (response) {
//             console.log("success");

//             $("#cours").empty();

//             index = 0;
//             $.each(response, function (i, training) {
//                 // for (let index = 0; index < idTraining.length; index++) {

//                 if (idTraining[index] != training.id) {
//                     $("#cours").append('<tr>' +
//                         '<td>' + training.subject + '</td>' +
//                         '<td>' + new Date(training.start).toLocaleString() + '</td>' +
//                         '<td>' + new Date(training.end).toLocaleString() + '</td>' +
//                         '<td><button id=' + training.id + ' type="button" class="btn btn-success training btn-sm" data-toggle="modal" data-target="#myModalDisplayTraining"><i class="fas fa-eye"></i> Afficher</button> <button id=id=' + training.id + "_particip" + ' type="button" class="btn btn-primary btn-sm"><i class="fas fa-pen"></i> Participer</button></td>' +
//                         '</tr>');
//                 } else index++;

//                 // }
//             });
//             $('#tabcours').DataTable({
//                 "retrieve": true,
//                 "paging": true,
//                 "lengthChange": true,
//                 "searching": true,
//                 "ordering": true,
//                 "info": true,
//                 "autoWidth": false,
//                 "responsive": true,
//                 "language": {
//                     "url": "vendor/datatable.french.json"
//                 }
//             });

//         },
//         error: function (jqxhr) {
//             $('#errorStudent').fadeIn();
//             $('#errorStudent').delay(6000).fadeOut();
//         },


//     });
// }