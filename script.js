function toggleForm() {
    document.getElementById("login-box").style.display = 
        document.getElementById("login-box").style.display === "none" ? "block" : "none";
    document.getElementById("signup-box").style.display = 
        document.getElementById("signup-box").style.display === "none" ? "block" : "none";
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function signup() {
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;

    if (username && password) {
        localStorage.setItem(username, password); // Store user data in localStorage
        alert("Signup successful. Please login.");
        toggleForm();
    } else {
        alert("Please enter a username and password.");
    }
}

function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;
    let storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
        setCookie("loggedInUser", username, 1); // Set a session cookie
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid login credentials.");
    }
}

function checkAuth() {
    if (!getCookie("loggedInUser")) {
        window.location.href = "login.html";
    }
}

function logout() {
    setCookie("loggedInUser", "", -1); // Expire the cookie
    window.location.href = "login.html";
}
