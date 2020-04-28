//***********************************************************************
//*************************** LOGIN *************************************
//***********************************************************************

$(document).ready(function () {
    console.log(BACKEND_URL);
    $("#submit").click(function (e) {
        e.preventDefault();
        console.log($('input[name=email]').val());
        var data = {};
        data['email'] = $('input[name = email]').val(); //Recuperation des données formulaire connexion
        data['password'] = $('input[name = password]').val(); //email et password
        if (!(data['email']) || !(data['password'])) {
            alert("Veuillez saisir un identifiant et un mot de passe !");
        } else
            $("#logpending").show();
            $.ajax({
                url: 'http://gestform/security/login_check', //Request
                type: 'POST',
                dataType: 'json', //type de données qu'on attend en réponse du serveur
                contentType: "application/json",
                processData: false, //Définit à false permet d'eviter => application / x-www-form-urlencoded(par default)
                data: JSON.stringify(data), //Envoi des données en JSON

                success: function (response) {
                    console.log("success");
                    localStorage.setItem('MonToken', response.token); //On stock la response (token de connexion)
                    $.ajax({
                        url: 'http://gestform/user/getCurrentUser',
                        type: 'get',
                        dataType: 'json',
                        contentType: 'application/json',
                        headers: {
                            Authorization: `Bearer ${ localStorage.getItem('MonToken') }`
                        }, //token dans le header de la requete


                        success: function (response) {
                            console.log(response.roles[0]);
                            dashboardChooser(response.roles[0]);
                        },
                        error: function (jqxhr) {
                            $("#logpending").hide();
                            $("#logerror").show();
                        },
                    });
                },

                error: function (jqXhr) {
                    alert(jqXhr.responseText);
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
