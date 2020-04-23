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
            location.href = 'index.html';
        },
    });

    ////////////////////GET/affichage des trainings disponible////////////////////////////
    $.ajax({
        url: 'https://gestform.ei-bs.eu/training/getAllTraining',
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
                    '<span class= "date"><i class="icon-calendar"></i>' + training.startTraining + '</span><br />' +
                    '<span class= "date"><i class="icon-calendar"></i>' + training.endTraining + '</span><br />' +
                    //'<p> Contenu du cours: ' + training.description + '</p>' +
                    //'<p> Nombre d\'élèves: ' + training.studentsCount + '</p>' +
                    '<button id=' + training.id + ' type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#myModalDisplayTraining">Afficher</button>' +
                    '<button id=' + training.id + ' type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalUpdateTraining">Participer</button>' +
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
                var chnStart = response.startTraining;
                var start = chnStart.substring(0, 19);

                var chnEnd = response.endTraining;
                var end = chnEnd.substring(0, 19);

                $("h1[name=subject]").empty().append(response.subject);
                $("p[name=NameTeacher]").empty().append(response.teacher['lastname'] + " " + response.teacher['firstname']);
                $('p[name=start_training]').empty().append(start);
                $('p[name=end_training]').empty().append(end);
                $('p[name=max_student]').empty().append(response.maxStudent);
                $('p[name=price_per_student]').empty().append(response.pricePerStudent);
                $('p[name=training_description]').empty().append(response.trainingDescription);

            },
            error: function (jqXhr) {
                alert(jqXhr.responseText);
            },
        })

    });

    ////////////////////PUT/S'inscrire à un cours////////////////////////////////

    $(document).on('click', ".btn-primary", function (e) {
        e.preventDefault();
        console.log($(this).attr('id'));
        var data = {};
        data['id'] = $(this).attr('id');

        if (confirm("Etes-vous sûr de vouloir participer à ce Training ?")) {
            $.ajax({
                url: 'https://gestform.ei-bs.eu/student/subscribeTraining',
                type: 'PUT',
                dataType: 'json', //type de données qu'on attend en réponse du serveur
                contentType: "application/json",
                processData: false, //Définit à false permet d'eviter => application / x-www-form-urlencoded(par default)
                data: JSON.stringify(data), //Envoi des données en JSON
                headers: {
                    Authorization: `Bearer ${ token }`
                },

                success: function (response) {
                    alert('Vous avez était inscrit avec succés !');
                },
                error: function (jqXhr) {
                    alert(jqXhr.responseText);
                },
            });
        } else {
            location.href = 'student.html';
        }

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
            location.href = 'student.html';
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