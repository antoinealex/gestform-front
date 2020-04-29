let BACKEND_URL = "http://gestform/";
let isConnected = false;
let currentUser;


$(document).ready(function() {
    $("#loader").fadeOut;
    if (localStorage.getItem('MonToken')) {
        token = localStorage.getItem('MonToken');
        $.ajax({
                url: BACKEND_URL + "user/getCurrentUser", //Request
                type: 'GET',
                headers: {Authorization: `Bearer ${token}`},
                success: function (response) {
                    currentUser = response;
                    dashboardChooser(currentUser.roles[0]);
                    $("#userInfo").append("Bonjour "+currentUser.firstname);
                },
                error: function() {
                    $.ajax({
                        url: "login.html",
                        type: 'GET',
                        datatype: "HTML",
                        success: function (response) {
                            $("#loginInterface").append(response);
                            login();
                        }
                    });
                }
            }
        );
    } else {
        $.ajax({
            url: "login.html",
            type: 'GET',
            datatype: "HTML",
            success: function (response) {
                $("#loginInterface").append(response);
                login();
            }
        });
    }
});

/*---FUNCTION TO SHOW USER DASHBOARD---*/

function dashboardChooser(role) {
    $("#loginInterface").fadeOut();
    showMenu();
    if (role === "ROLE_ADMIN") {
        adminDashboard();
    } else if (role === "ROLE_TEACHER") {
        teacherDashboard();
    } else if (role === "ROLE_STUDENT") {
        studentDashboard();
    }
}

function adminDashboard() {
    $.ajax({
        url: "admin.html",
        type: 'GET',
        datatype: "HTML",
        success: function (response) {
            $("#dashboard").append(response);
            location.hash = 'adminDashboard';
        }
    });
}

function teacherDashboard() {
    $.ajax({
        url: "teacher.html",
        type: 'GET',
        datatype: "HTML",
        success: function (response) {
            $("#dashboard").append(response);
        }
    });
}

function studentDashboard() {
    $.ajax({
        url: "student.html",
        type: 'GET',
        datatype: "HTML",
        success: function (response) {
            $("#dashboard").append(response);
        }
    });
}

function showMenu() {
    $.ajax({
        url: "menu.html",
        type: 'GET',
        datatype: "HTML",
        success: function (response) {
            $("#menu").append(response);
            $("#helloUser").append("Bonjour "+currentUser.firstname);
        }
    });
}