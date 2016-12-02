$(document).ready(function(){
    $(".button-collapse").sideNav();

});
// Name and Password from the register-form
var regName = document.getElementById('userName');
var pw = document.getElementById('pw');

// storing input from register-form
function store() {
    localStorage.setItem('userName', regName.value);
    localStorage.setItem('pw', pw.value);
}

// check if stored data from register-form is equal to entered data in the   login-form
function check() {

    // stored data from the register-form
    var storedName = localStorage.getItem('userName');
    var storedPw = localStorage.getItem('pw');

    // entered data from the login-form
    var userName = document.getElementById('username');
    var userPw = document.getElementById('userPw');

    // check if stored data from register-form is equal to data from login form
    if(userName.value !== storedName || userPw.value !== storedPw) {
        alert('ERROR');
    }else {
        alert('You are loged in.');
    }
}