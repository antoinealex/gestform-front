//*****************************************************************************
//********************************** GET **************************************
//*****************************************************************************
var token = localStorage.getItem('MonToken');
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
                $("#cours").empty();
                $.each(response, function (i, training) {
                    $("#cours").append('<tr>' +
                        '<td>' + training.subject + '</td>' +
                        '<td>' + new Date(training.startDatetime).toLocaleString() + '</td>' +
                        '<td>' + new Date(training.endDatetime).toLocaleString() + '</td>' +
                        '<td><button id=' + i + ' type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#myModalDisplayTeacher"><i class="fas fa-eye"></i> Afficher</button> <button id=' + i + ' type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateTraining"><i class="fas fa-pen"></i> Editer</button></td>' +
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
                        "url": "vendor/datatable.french.json"
                    }
                });

            },
            error: function (jqxhr) {
                $('#errorTeacher').fadeIn();
                $('#errorTeacher').delay(6000).fadeOut();
            },


        });
    });


    //****************getTrainingById*****************************
    $(document).on('click', ".btn-success", function (e) {
        e.preventDefault();
        var id = $(this).attr('id');

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

                $("#myModalDisplayTeacherExport").empty().append('<button id=' + id + "_excel" + ' type="button" class="btn btn-success btn-sm">' +
                    '<i class="fa fa-download"></i>EXCEL</button>' + '  ' +
                    '<button id=' + id + "_pdf" + ' type="button" class="btn btn-danger btn-sm">' +
                    '<i class="fa fa-download"></i>PDF</button>');


            },
            error: function (jqXhr) {
                $('#errorTeacher').fadeIn();
                $('#errorTeacher').delay(6000).fadeOut();
            },
        });

    });

    //****************getCurrentTeacherStudents (pour récuperer les Students)***********************

    $(document).ready(function () {

        $("#students").empty();

        $.ajax({

            url: BACKEND_URL + 'teacher/getCurrentTeacherStudents',
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                Authorization: `Bearer ${ token }`
            },


            success: function (response) {
                console.log("success");

                $.each(response, function (i, student) {
                    $("#students").append('<tr>' +
                        '<td>' + student.firstname + '</td>' +
                        '<td>' + student.lastname + '</td>' +
                        '<td>' + student.subject + '</td>' +
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
                $('#errorTeacher').fadeIn();
                $('#errorTeacher').delay(6000).fadeOut();
            },
        });

    });


    //*****************************************************************************
    //********************************** POST *************************************
    //*****************************************************************************


    //****************addTraining**************************
    $("#submit_training").click(function (e) {
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

                $("#myModalAjoutTrainigClose").trigger("click");

                table = $('#tabcours').DataTable();
                table.destroy();
                RefreshTab();
            },
            error: function (jqXhr) {
                $('#errorTeacher').fadeIn();
                $('#errorTeacher').delay(6000).fadeOut();

                $('input[name = start_training]').val("");
                $('input[name = end_training]').val("");
                $('input[name = max_student]').val("");
                $('input[name = price_per_student]').val("");
                $('input[name = training_description]').val("");
                $('input[name = subject]').val("");

                $("#myModalAjoutTrainigClose").trigger("click");
            },
        });
    });


    //*****************************************************************************
    //********************************** PUT **************************************
    //*****************************************************************************

    //****************updateTraining*************************

    $(document).on('click', ".btn-primary", function (e) {
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

                $("input[name=training_id]").val(response.id);
                $('#start_training').val(start);
                $('#end_training').val(end);
                $('#max_student').val(response.maxStudent);
                $('#price_per_student').val(response.pricePerStudent);
                $('#training_description').val(response.trainingDescription);
                $('#subject').val(response.subject);
                $('#formUpdateTraining').toggle("slide");

                $("#submit_u").click(function (e) {
                    e.preventDefault();
                    data = {
                        "id": $('#training_id').val(),
                        "startTraining": $('#start_training').val(),
                        "endTraining": $('#end_training').val(),
                        "maxStudent": $('#max_student').val(),
                        "pricePerStudent": $('#price_per_student').val(),
                        "trainingDescription": $('#training_description').val(),
                        "subject": $('#subject').val()
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
                            $('#successTeacher').fadeIn();
                            $('#successTeacher').delay(6000).fadeOut();
                            $("#myModalUpdateTrainingClose").trigger("click");

                            table = $('#tabcours').DataTable();
                            table.destroy();
                            RefreshTab();
                        },
                        error: function (jqXhr) {
                            $('#errorTeacher').fadeIn();
                            $('#errorTeacher').delay(6000).fadeOut();
                            $("#myModalUpdateTrainingClose").trigger("click");
                        },
                    });
                });

            },
            error: function (jqXhr) {
                $('#errorTeacher').fadeIn();
                $('#errorTeacher').delay(6000).fadeOut();
                $("#myModalUpdateTrainingClose").trigger("click");
            },
        });

    });



    //****************updateCurrentUser*****************************
    $(document).on('click', "#modalUpdateProfil", function (e) {
        //e.preventDefault();

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
                            $('#successTeacher').fadeIn();
                            $('#successTeacher').delay(6000).fadeOut();
                            $('#myModalUpdateProfilClose').trigger('click');

                        },
                        error: function (jqXhr) {
                            $('#errorTeacher').fadeIn();
                            $('#errorTeacher').delay(6000).fadeOut();
                            $('#myModalUpdateProfilClose').trigger('click');
                        },
                    });
                });

            },
            error: function (jqXhr) {
                $('#errorTeacher').fadeIn();
                $('#errorTeacher').delay(6000).fadeOut();
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

                success: function (response) {
                    $("#successUpdatePassword").fadeIn().delay(6000).fadeOut();
                    $("#oldpassword").val("");
                    $("#newpassword").val("");
                    $("#myModalUpdatePasswordClose").trigger("click");
                },
                error: function (jqXhr) {
                    $('#errorUpdatePassword').fadeIn().delay(6000).fadeOut();
                    $("#oldpassword").val("");
                    $("#newpassword").val("");
                    $("#myModalUpdatePasswordClose").trigger("click");
                },
            });
        }
    });

    //****************Export to Excel********************

    $(document).on('click', "[id$=_excel]", function (e) {

        e.preventDefault();
        console.log("je suis ici");
        var id = $(this).attr('id').replace("_excel", "");
        console.log(id);

        $.ajax({
            url: BACKEND_URL + "exports/getTrainingStudents/excel?id=" + id,
            type: 'GET',
            headers: {
                Authorization: `Bearer ${ token }`
            },
            success: function (response) {
                location.href = "http://gestform/" + response.filename;
                //Success alert
                $('#successTeacher').fadeIn(400);
                $('#successTeacher').delay(6000).fadeOut(400);
            },

            error: function (jqXHR, textStatus, errorThrown) {
                //Error alert
                $('#errorTeacher').fadeIn(400);
                $('#errorTeacher').delay(6000).fadeOut(400);
                console.log(textStatus, errorThrown);
            }
        });
    });


    //****************Export to Pdf********************

    $(document).on('click', "[id$=_pdf]", function (e) {

        e.preventDefault();
        console.log("je suis ici");
        var id = $(this).attr('id').replace("_pdf", "");
        console.log(id);

        $.ajax({
            url: BACKEND_URL + "exports/getTrainingStudents/pdf?id=" + id,
            type: 'GET',
            headers: {
                Authorization: `Bearer ${ token }`
            },
            success: function (response) {
                location.href = "http://gestform/" + response.filename;
                //Success alert
                $('#successTeacher').fadeIn(400);
                $('#successTeacher').delay(6000).fadeOut(400);
            },

            error: function (jqXHR, textStatus, errorThrown) {
                //Error alert
                $('#errorTeacher').fadeIn(400);
                $('#errorTeacher').delay(6000).fadeOut(400);
                console.log(textStatus, errorThrown);
            }
        });
    });
});

//*******************************FONCTIONS**************************************
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
            $("#cours").empty();
            $.each(response, function (i, training) {
                $("#cours").append('<tr>' +
                    '<td>' + training.subject + '</td>' +
                    '<td>' + new Date(training.startDatetime).toLocaleString() + '</td>' +
                    '<td>' + new Date(training.endDatetime).toLocaleString() + '</td>' +
                    '<td><button id=' + i + ' type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#myModalDisplayTeacher"><i class="fas fa-eye"></i> Afficher</button> <button id=' + i + ' type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateTraining"><i class="fas fa-pen"></i> Editer</button><br/></td>' +
                    '</tr>');
            });
            $('#tabcours').DataTable({
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
            $('#errorTeacher').fadeIn();
            $('#errorTeacher').delay(6000).fadeOut();
        },


    });
}