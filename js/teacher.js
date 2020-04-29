//*****************************************************************************
//********************************** GET **************************************
//*****************************************************************************

//****************getCurrentUser************************
$(document).ready(function () {

    //****************getMyTrainings*****************************
    $(document).on('click', '#home-tab', function () {

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
                        '<td><button id=' + i + ' type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#myModalDisplayTeacher">Afficher</button> <button id=' + i + ' type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateTraining">Editer</button> <button id=' + i + ' type="button" class="btn btn-danger btn-sm">Supprimer</button><br /></td>' +
                        '</tr>')
                });
                $('#tabcours').DataTable();

            },
            error: function (jqxhr) {
                alert(jqxhr.responseText);
            },


        });
    });


    //****************getTrainingById*****************************
    $(document).on('click', ".btn-success", function (e) {
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
                alert(jqXhr.responseText);
            },
        });

    });

    //****************getTrainingById (pour récuperer les Students)***********************
    $(document).on('click', "#profile-tab", function (e) {

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

                        url: 'https://gestform.ei-bs.eu/training/getTrainingById?id=' + i,
                        type: 'get',
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
                                    //'<td><button id=' + i + ' type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#myModalDisplayTeacher">Afficher</button></td>' +
                                    '</tr>')

                            });
                            $('#tabstudents').DataTable();


                        },
                        error: function (jqxhr) {
                            alert(jqxhr.responseText);
                        },
                    });
                });
            },

            error: function (jqxhr) {
                alert(jqxhr.responseText);
            },
        });

    });

    //*****************************************************************************
    //********************************** POST *************************************
    //*****************************************************************************


    //****************addTraining**************************
    $(document).on('click', "#submit_training", function (e) {
        e.preventDefault();

        console.log($('input[name=teacher_id]').val());
        $.ajax({
            url: BACKEND_URL + 'training/addTraining',
            type: 'POST',
            data: {
                teacher_id: $('input[name = teacher_id]').val(),
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
                alert('Training Ajouté avec succés !');
                //location.reload(true);
            },
            error: function (jqXhr) {
                alert(jqXhr.responseText);
            },
        });
    });

    //****************createUser******************************
    $(document).on('click', '#submit_s', function (e) {
        e.preventDefault();
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



            var form = $("#formS")[0]; //On récupére le formulaire par son id
            var data = new FormData(form); //On le passe en param dans l'objet FormData

            console.log(data);
            $.ajax({
                url: BACKEND_URL + 'admin/createUser',
                type: 'POST',
                data: data,
                contentType: false,
                cache: false,
                processData: false, //Important
                enctype: 'multipart/form-data',
                headers: {
                    Authorization: `Bearer ${ token }`
                },

                success: function (jqXhr) {
                    //alert(jqXhr.responseText);
                    alert('Student ajouté avec succés !');

                    //location.reload(true);
                },
                error: function (jqXhr) {
                    alert(jqXhr.responseText);
                    //location.reload(true);
                },
            });
        }
    });

    //*****************************************************************************
    //********************************** DELETE ***********************************
    //*****************************************************************************


    //****************deleteTraining****************************
    $(document).on('click', ".btn-danger", function (e) {
        e.preventDefault();
        console.log($(this).attr('id'));
        if (confirm("Etes-vous sûr de vouloir supprimer ce Training ?")) {
            $.ajax({
                url: BACKEND_URL + 'admin/deleteTraining?id = ' + $(this).attr('id'),
                type: 'DELETE',
                headers: {
                    Authorization: `Bearer ${ token }`
                },

                success: function (response) {
                    //location.reload(true);
                },
                error: function (jqXhr) {
                    alert(jqXhr.responseText);
                },
            });
        }
    });

    //*****************************************************************************
    //********************************** PUT **************************************
    //*****************************************************************************

    //****************updateTraining*************************

    $(document).on('click', ".btn-primary", function (e) {
        e.preventDefault();
        console.log($(this).attr('id'));

        if (confirm("Etes-vous sûr de vouloir modifier ce Training ?")) {
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
                                alert('Training Modifié avec succés !');
                                //location.reload(true);
                            },
                            error: function (jqXhr) {
                                alert(jqXhr.responseText);
                            },
                        });
                    });

                },
                error: function (jqXhr) {
                    alert(jqXhr.responseText);
                },
            });
        } else {
            //location.href = 'teacher.html';
        }
    });



    //****************updateCurrentUser*****************************
    $(document).on('click', "#modalUpdateProfil", function (e) {
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
                                alert('Informations Modifiées avec succés !');
                                location.reload(true);
                            },
                            error: function (jqXhr) {
                                alert(jqXhr.responseText);
                            },
                        });
                    });

                },
                error: function (jqXhr) {
                    alert(jqXhr.responseText);
                },
            });
        } else {
            //location.href = 'teacher.html';
        }
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
                    alert('Mot de passe modifié avec succés !');
                    location.reload(true);
                },
                error: function (jqXhr) {
                    alert(jqXhr.responseText);
                    //location.reload(true);
                },
            });
        }
    });
});