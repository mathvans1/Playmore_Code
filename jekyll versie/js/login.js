$(document).ready(function(){
    $(".button-collapse").sideNav();

});

// naam en pas register
var regiName = document.getElementById('regname');
var regiPw = document.getElementById('regpw');

function store() {
    localStorage.setItem('uName', regiName.value);
    localStorage.setItem('pw', regiPw.value);
}

function check() {


    var storedName = localStorage.getItem('uName');
    var storedPw = localStorage.getItem('pw');


    var userName = document.getElementById('logname');
    var userPw = document.getElementById('logpw');


    if(userName.value == storedName && userPw.value == storedPw) {
        alert('Logged in.');
    }else {
        alert('Gebruiker of wachtwoord wordt niet herkend.' + userName);
    }
}
