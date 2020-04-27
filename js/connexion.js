//***********************************************************************
//*************************** LOGIN *************************************
//***********************************************************************

$(document).ready(function () {
    $("#submit").click(function (e) {
        e.preventDefault();
        console.log($('input[name=email]').val());
        var data = {};
        data['email'] = $('input[name = email]').val(); //Recuperation des données formulaire connexion
        data['password'] = $('input[name = password]').val(); //email et password
        if (!(data['email']) || !(data['password'])) {
            alert("Veuillez saisir un identifiant et un mot de passe !");
        } else
            $.ajax({
                url: 'https://gestform.ei-bs.eu/security/login_check', //Request
                type: 'POST',
                dataType: 'json', //type de données qu'on attend en réponse du serveur
                contentType: "application/json",
                processData: false, //Définit à false permet d'eviter => application / x-www-form-urlencoded(par default)
                data: JSON.stringify(data), //Envoi des données en JSON

                success: function (response) {
                    console.log("success");
                    localStorage.setItem('MonToken', response.token); //On stock la response (token de connexion)    
                    $.ajax({
                        url: 'https://gestform.ei-bs.eu/user/getCurrentUser',
                        type: 'get',
                        dataType: 'json',
                        contentType: 'application/json',
                        headers: {
                            Authorization: `Bearer ${ localStorage.getItem('MonToken') }`
                        }, //token dans le header de la requete


                        success: function (response) {
                            console.log(response.roles[0]);
                            if (response.roles[0] == "ROLE_ADMIN") {
                                location.href = 'admin.html';
                            } else if (response.roles[0] == "ROLE_TEACHER") {
                                location.href = 'teacher.html';
                            } else if (response.roles[0] == "ROLE_STUDENT") {
                                location.href = 'student.html';
                            } else if (response.roles[0] == null) {
                                alert('Rôle non défini, merci de contacter l administrateur !')
                                location.href = 'index.html';
                            } else
                                location.href('index.html');
                        },
                        error: function (jqxhr) {
                            alert(jqxhr.responseText);
                            location.href = 'index.html';
                        },
                    });
                },

                error: function (jqXhr) {
                    alert(jqXhr.responseText);
                    location.href = 'index.html';
                },
            });
    });
});

//***********************************************************************
//*************************** LOGOUT ************************************
//***********************************************************************

$('#disconnect').click(function(e){
    e.preventDefault();

    data = localStorage.setItem('MonToken', '');
    location.href = "index.html";
})
