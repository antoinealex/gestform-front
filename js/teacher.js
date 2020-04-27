//////////////////GET/affichage des données Utilisateur connecté////////////////////////
$(document).ready(function () {
    var token = localStorage.getItem('MonToken'); //On récupére le token stocké pour l'authent
    $.ajax({
        url: 'https://gestform.ei-bs.eu/user/getCurrentUser',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            Authorization: `Bearer ${ token }`
        }, //token dans le header de la requete


        success: function (response) {
            console.log("success");
            $(".page-title h2").append("</br>" + response.lastname + " " + response.firstname);

        },
        error: function (jqxhr) {
            alert(jqxhr.responseText);
            location.href('index.html');
        },
    });

    ////////////////////GET/affichage des trainings du teacher////////////////////////////
    $.ajax({
        url: 'https://gestform.ei-bs.eu/teacher/getMyTrainings',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            Authorization: `Bearer ${ token }`
        },


        success: function (response) {
            console.log("success");
            $.each(response, function (i, training) {
                $("#cours").append('<div class="accordion-toggle">' +
                    '<h3>' + training.subject + '</h3><br />' +
                    '<span class= "date"><i class="icon-calendar"></i>' + training.startDatetime + '</span><br />' +
                    '<span class= "date"><i class="icon-calendar"></i>' + training.endDatetime + '</span><br />' +
                    //'<p> Contenu du cours: ' + training.description + '</p>' +
                    //'<p> Nombre d\'élèves: ' + training.studentsCount + '</p>' +
                    '<button id=' + i + ' type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#myModalDisplayTeacher">Afficher</button>' +
                    '<button id=' + i + ' type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateTraining">Editer</button>' +
                    '<button id=' + i + ' type="button" class="btn btn-danger btn-sm">Supprimer</button><br />' +
                    '</div>'
                );
            });
        },
        error: function (jqxhr) {
            alert(jqxhr.responseText);
        },


    });

    ////////////////////GET/affichage d'un TrainingById////////////////////////////////

    $(document).on('click', ".btn-success", function (e) {
        e.preventDefault();

        console.log($(this).attr('id'));

        $.ajax({
            url: 'https://gestform.ei-bs.eu/training/getTrainingById?id=' + $(this).attr('id'),
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                Authorization: `Bearer ${ token }`
            },

            success: function (response) {

                $("h1[name=NameTeacher]").empty().append(response.teacher['lastname'] + " " + response.teacher['firstname']);
                $("p[name=training_id]").empty().append(response.id);
                $('p[name=start_training]').empty().append(response.startTraining);
                $('p[name=end_training]').empty().append(response.endTraining);
                $('p[name=max_student]').empty().append(response.maxStudent);
                $('p[name=price_per_student]').empty().append(response.pricePerStudent);
                $('p[name=training_description]').empty().append(response.trainingDescription);
                $('p[name=subject]').empty().append(response.subject);


            },
            error: function (jqXhr) {
                alert(jqXhr.responseText);
            },
        })

    });

    ////////////////////GET/affichage des students du teacher//////////////////////////////

    $.ajax({
        url: 'https://gestform.ei-bs.eu/teacher/getMyTrainings',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            Authorization: `Bearer ${ token }`
        },


        success: function (response) {


            console.log("success");
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
                            $("#eleves").append('<div class="accordion-toggle" id="eleves">' +
                                '<h3>' + student.lastname + " " + student.firstname + '</h3><br>' +
                                '<span class= "text"><span>&#9997;</span>' + response.subject + '</span>' +

                                '</div>');

                        })
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




    ///////////////////////POST/Ajout d'un training////////////////////////////////////

    $("#submit_t").click(function (e) {
        e.preventDefault();
        console.log($('input[name=teacher_id]').val());
        $.ajax({
            url: 'https://gestform.ei-bs.eu/training/addTraining',
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
                location.reload(true);
            },
            error: function (jqXhr) {
                alert(jqXhr.responseText);
            },
        });
    });
    ////////////////////////POST/Ajout d'un student => à déplacer(ADMIN)  ////////////////////////////

    $("#submit_s").click(function (e) {
        e.preventDefault();
        if ($("#email").val().length === 0) {
            $("#email").after('<div class="alert alert-danger" > Merci de remplir ce champ !</div>');
        } else if (!$("#email").val().match(/^[a-zA-Z0-9\.\-_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}$/i)) { //Regex validation mail
            $("#email").after('<div class="alert alert-danger"> Mail invalide !</div>');
        } else if ($("#password").val().length === 0) {
            $("#password").after('<span style="color:red"> Merci de remplir ce champ !</span>');
        } else if (!$("#password").val().match(/^(?=.*[a-z])(?=.*[0-9]).{6,}$/i)) { //Regex=> 6 caractéres au moins une lettre et un chiffre
            $("#password").after('<span style="color:red"> 6 caractéres minimum dont un [a-b] et un [0-9] !</span>');

        } else {



            var form = $("#formS")[0]; //On récupére le formulaire par son id
            var data = new FormData(form); //On le passe en param dans l'objet FormData

            console.log(data);
            $.ajax({
                url: 'https://gestform.ei-bs.eu/admin/createUser',
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

                    location.reload(true);
                },
                error: function (jqXhr) {
                    alert(jqXhr.responseText);
                    location.reload(true);
                },
            });
        }
    });

    ////////////////////////DELETE Training/////////////////////////////////////////////
    $(document).on('click', ".btn-danger", function (e) {
        e.preventDefault();
        console.log($(this).attr('id'));
        if (confirm("Etes-vous sûr de vouloir supprimer ce Training ?")) {
            $.ajax({
                url: 'https://gestform.ei-bs.eu/admin/deleteTraining?id = ' + $(this).attr('id'),
                type: 'DELETE',
                headers: {
                    Authorization: `Bearer ${ token }`
                },

                success: function (response) {
                    location.reload(true);
                },
                error: function (jqXhr) {
                    alert(jqXhr.responseText);
                },
            })
        }
    });

    ////////////////////////UPDATE Training////////////////////////////////

    $(document).on('click', ".btn-primary", function (e) {
        e.preventDefault();
        console.log($(this).attr('id'));

        if (confirm("Etes-vous sûr de vouloir modifier ce Training ?")) {
            $.ajax({
                url: 'https://gestform.ei-bs.eu/training/getTrainingById?id=' + $(this).attr('id'),
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
                },
                error: function (jqXhr) {
                    alert(jqXhr.responseText);
                },
            })
        } else {
            location.href = 'teacher.html';
        }
    });

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
        }

        $.ajax({
            url: 'https://gestform.ei-bs.eu/teacher/updateTraining',
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
                location.reload(true);
            },
            error: function (jqXhr) {
                alert(jqXhr.responseText);
            },
        });
    });

    ////////////////////////UPDATE Profil CurrentUser////////////////////////////////
    $("#modalUpdateProfil").click(function (e) {
        e.preventDefault();

        if (confirm("Etes-vous sûr de vouloir modifier votre profil ?")) {
            $.ajax({
                url: 'https://gestform.ei-bs.eu/user/getCurrentUser',
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
                    alert(jqXhr.responseText);
                },
            })
        } else {
            location.href = 'teacher.html';
        }
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
            url: 'https://gestform.ei-bs.eu/user/updateCurrentUser',
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

});