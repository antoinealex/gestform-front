//***********************************************************************
//*************************** LOGIN *************************************
//***********************************************************************

function login(callback) {
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
                            console.log("on est ici ;)");
                            dashboardChooser(currentUser.roles[0]);

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

//***********************************************************************
//*********************** FORGOT PASSWORD *******************************
//***********************************************************************
function forgotpassword(callback) {
    $("#sendEmail").click(function (e) {
        e.preventDefault();

        $.ajax({
            url: BACKEND_URL + 'security/forgotpassword', //Request
            type: 'POST',
            processData: false, //Définit à false permet d'eviter => application / x-www-form-urlencoded(par default)
            data: "email=" + $('input[name = myEmail]').val(),
            success: function () {
                $("#emailsuccess").fadeIn();
                $("#sendEmailInterface").fadeOut();
                $("#loginInterface").fadeIn();

            },
            error: function (jqXhr) {
                $("#emailpending").fadeOut();
                $("#emailerror").fadeIn();
                console.log(data);
            },
        });
    });
}

//***********************************************************************
//*********************** RESET PASSWORD ********************************
//***********************************************************************
$("#submitReset").click(function (e) {
    e.preventDefault();
    //récupérer le token dans l'url
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var token = urlParams.get('resetpassword?token');

    var password = $('input[name = newPassword]').val();
    var confirmPassword = $('input[name = ConfirmNewPassword]').val();
    
    //Regex pour formater le mot de passe
    if (password == confirmPassword) {
        if (password.length === 0) {
            password.after('<span style="color:red"> Merci de remplir ce champ !</span>');
        } else if (!password.match(/^(?=.*[a-z])(?=.*[0-9]).{6,}$/i)) { //Regex=> 6 caractéres au moins une lettre et un chiffre
            password.after('<span style="color:red"> 6 caractéres minimum dont un [a-b] et un [0-9] !</span>');
        } else {
            $("#passwordpending").show();
            $.ajax({
                url: BACKEND_URL + 'security/resetPassword', //Request
                type: 'POST',
                processData: false, //Définit à false permet d'eviter => application / x-www-form-urlencoded(par default)
                data: "token=" + token + "&password=" + password,
                success: function () {
                    window.location.replace("index.html");
                },
                error: function (jqXhr) {
                    $("#passwordpending").fadeOut();
                    $("#passworderror").fadeIn();
                    $("#newPassword").val("");
                    $("#ConfirmNewPassword").val("");
                    console.log(data);
                },
            });
        }
    } else {
        $("#credsMissingPass").fadeIn();
    }
});