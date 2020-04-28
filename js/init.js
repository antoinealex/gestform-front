let BACKEND_URL = "http://gestform/";
let isConnected = false;
let currentUser;

if (localStorage.getItem('MonToken')) {
    token = localStorage.getItem('MonToken');
    console.log(token);
    $(document).ready(function(){
        $.ajax({
                url: BACKEND_URL + "user/getCurrentUser", //Request
                type: 'GET',
                headers: {Authorization: `Bearer ${token}`},
                success: function (response) {
                    currentUser = response;
                    dashboardChooser(currentUser.roles[0]);
                    },
                }
            );
        }
    );

} else {
    isConnected = false;
    currentUser = false;
}

/*---FUNCTION TO SHOW USER DASHBOARD---*/

function dashboardChooser(role) {
    if (role === "ROLE_ADMIN") {
        $("#loginInterface").fadeOut();
        adminDashboard();
    } else if (role === "ROLE_TEACHER") {
    } else if (role === "ROLE_STUDENT") {
    }
}

function adminDashboard() {
    $.ajax({
        url: "admin.html",
        type: 'GET',
        datatype: "HTML",
        success: function (response) {
            $("#dashboard").append(response);
        }
    });
}