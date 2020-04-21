//////////////////GET/affichage des données Utilisateur connecté//////////////////
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
    ////////////////////GET/affichage des trainings du teacher//////////////////////
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
                    '<p> Contenu du cours: ' + training.description + '</p>' +
                    '<p> Nombre d\'élèves: ' + training.studentsCount + '</p>' +
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

    ////////////////////GET/affichage des students du teacher//////////////////////
    $.ajax({
        url: 'https://gestform.ei-bs.eu/training/getTrainingById?id=20',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            Authorization: `Bearer ${ token }`
        },


        success: function (response) {
            console.log("success");
            $.each(response.participants, function (i, student) {
                $("#eleves h3").append(student.lastname + " " + student.firstname);
            })
        },
        error: function (jqxhr) {
            alert(jqxhr.responseText);
        },


    });

    ///////////////////////POST/Ajout d'un training////////////////////////////////
    $('#addTraining').click(function () {
        $('#formAddTraining').toggle("slide"); //Affiche le formulaire
    });

    $("#submit_t").click(function (e) {
        e.preventDefault();
        console.log($('input[name=teacher_id]').val());
        $.ajax({
            url: 'https://gestform.ei-bs.eu/training/addTraining',
            type: 'POST',
            data: {
                teacher_id: $('input[name=teacher_id]').val(),
                start_training: $('input[name=start_training]').val(),
                end_training: $('input[name=end_training]').val(),
                max_student: $('input[name=max_student]').val(),
                price_per_student: $('input[name=price_per_student]').val(),
                training_description: $('input[name=training_description]').val(),
                subject: $('input[name=subject]').val()
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

    ////////////////////////DELETE Training////////////////////////////////
    $(document).on('click', ".btn-danger", function (e) {
        e.preventDefault();
        console.log($(this).attr('id'));
        if (confirm("Etes-vous sûr de vouloir supprimer ce Training ?")) {
            $.ajax({
                url: 'https://gestform.ei-bs.eu/admin/deleteTraining?id=' + $(this).attr('id'),
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
                    $("input[name=training_id]").val(response.id);
                    $('#start_training').val(response.startTraining);
                    $('#end_training').val(response.endTraining);
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

});
