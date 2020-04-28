//***********************************************************************
//*************************** LOGIN *************************************
//***********************************************************************

function login() {
    $("#submitLogin").click(function (e) {
        e.preventDefault();
        var data = {};
        data['email'] = $('input[name = email]').val(); //Recuperation des données formulaire connexion
        data['password'] = $('input[name = password]').val(); //email et password
        if (!(data['email']) || !(data['password'])) {
            $("#credsMissing").fadeIn();
        } else {
            $("#credsMissing").fadeOut();
            $("#logerror").fadeOut();
            $("#logpending").show();
            $.ajax({
                url: BACKEND_URL + 'security/login_check', //Request
                type: 'POST',
                dataType: 'json', //type de données qu'on attend en réponse du serveur
                contentType: "application/json",
                processData: false, //Définit à false permet d'eviter => application / x-www-form-urlencoded(par default)
                data: JSON.stringify(data), //Envoi des données en JSON

                success: function (response) {
                    localStorage.setItem('MonToken', response.token); //On stock la response (token de connexion)
                    $.ajax({
                        url: BACKEND_URL + 'user/getCurrentUser',
                        type: 'get',
                        dataType: 'json',
                        contentType: 'application/json',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('MonToken')}`
                        }, //token dans le header de la requete


                        success: function (response) {
                            currentUser = response;
                        },
                        error: function (jqxhr) {
                            console.log(jqxhr.toString());
                        },
                    });
                },

                error: function (jqXhr) {
                    $("#logpending").fadeOut();
                    $("#logerror").fadeIn();
                },
            });
        }
    });
}

//***********************************************************************
//*************************** LOGOUT ************************************
//***********************************************************************

function logout(){
    localStorage.setItem('MonToken', '');
    console.log("ok");
    $.ajax({
        url: BACKEND_URL + 'security/logout',
        type: 'GET',
        success : function(){
            //location.href = "index.html";
        }

    });
}
