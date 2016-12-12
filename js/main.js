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
        alert('You are loged in.');
    }else {
        alert('Gebruiker of wachtwoord wordt niet herkend.' + userName);
    }
}

$(document).ready(function(){
    $('.parallax').parallax();
});

/*Scholen************************************************************************************************/
function ready(cb) {
    /in/.test(document.readyState)
        ? setTimeout(ready.bind(null, cb), 90)
        : cb();
};

ready(function(){

    var App = {
        "init": function() {
            this.URLSCHOOL = './data/basisschool.json'; // Cache the url with random users in variable URLRANDOMUSERME

            this.loadDataSchool(); // Load SCHOOL Data
        },
        "loadDataSchool": function() {
            //1. Create a XMLHttpRequest object (Send to and load data from a WebAPI)
            var xhr = typeof XMLHttpRequest != undefined
                ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');
            //2. Declare the type of the response
            xhr.responseType = 'json';
            //3. Listen to the changes in states within the connection
            xhr.onreadystatechange = function(){
                switch(xhr.readyState){
                    case 0:console.log('UNSENT');break;
                    case 1:console.log('OPENED');break;
                    case 2:console.log('HEADERS RECEIVED');console.log(this.getAllResponseHeaders());break;
                    case 3:console.log('LOADING');break;
                    case 4:default:
                    console.log('LOADED');
                    //If status equals 200 then everything is ok else nok
                    if(xhr.status == 200){
                        console.log('OK');
                        //Get the received data --> response
                        var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
                        var scholen = data.kml.Document.Folder.Placemark, n = scholen.length, school = null;
                        var tempString ="";
                        for(var i=0; i<n; i++) {
                            school = scholen[i];
                            var aantalScholen = '<h6>Aantal scholen: '+ n + '</h6>';

                            /*var school_naam =(school.ExtendedData.SchemaData.SimpleData[i]['#text']);*/

                            tempString += '<div id="school_name" class="card blue-grey darken-1 z-depth-2">';
                            tempString += '<div class="card-content white-text">';
                            tempString += '<span class="card-title" >' +school.ExtendedData.SchemaData.SimpleData[3]['#text'];
                            tempString += '</span>';
                            tempString += '<p>' +school.ExtendedData.SchemaData.SimpleData[1]['#text'] + ' ' + school.ExtendedData.SchemaData.SimpleData[14]['#text'];
                            tempString +=  '</p>';
                            tempString += '<p><a href="mailto:' +school.ExtendedData.SchemaData.SimpleData[16]['#text'];
                            tempString += '">E-mail</a></br>';
                            tempString += '<a href="tel:'+ school.ExtendedData.SchemaData.SimpleData[15]['#text'];
                            tempString += '">' + school.ExtendedData.SchemaData.SimpleData[15]['#text'];
                            tempString += '</a>';
                            tempString += '<div class="card-action">';
                            tempString += '<a target="_blank" class="waves-effect waves-light btn" href="' + school.ExtendedData.SchemaData.SimpleData[17]['#text'];
                            tempString += '">Website</a>';
                            tempString += '</div>';
                            tempString += '</div>';
                            tempString += '</div>';
                            document.getElementById("school_name").innerHTML= tempString;
                            document.getElementById("aantal_scholen").innerHTML = aantalScholen;

                        }
                    }else {
                        console.log(Error(xhr.status));
                    }
                    break;
                }

            };
            //4. Open the connection or tunnel to the resource on the url
            xhr.open('GET', this.URLSCHOOL, true);
            //5. Make the request to the specified resource
            xhr.send(null);
        }
    };

    App.init();

});

$(document).ready(function(){
    $('.parallax').parallax();
});
/*Speelterein**************************************************************************************/

var speelterrein;
ready(function(){

    var App = {
        "init": function() {
            this.URLSPEEL = './data/speelterrein.json'; // Cache the url with random users in variable URLRANDOMUSERME

            this.loadDataSpeel(); // Load SPEEL Data
        },
        "loadDataSpeel": function() {
            //1. Create a XMLHttpRequest object (Send to and load data from a WebAPI)
            var xhr = typeof XMLHttpRequest != undefined
                ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');
            //2. Declare the type of the response
            xhr.responseType = 'json';
            //3. Listen to the changes in states within the connection
            xhr.onreadystatechange = function(){
                switch(xhr.readyState){
                    case 0:console.log('UNSENT');break;
                    case 1:console.log('OPENED');break;
                    case 2:console.log('HEADERS RECEIVED');console.log(this.getAllResponseHeaders());break;
                    case 3:console.log('LOADING');break;
                    case 4:default:
                    console.log('LOADED');
                    //If status equals 200 then everything is ok else nok
                    if(xhr.status == 200){
                        console.log('OK');
                        //Get the received data --> response
                        var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
                        var speelterreinen = data.speelterreinen, n = speelterreinen.length, speelterrein = null;
                        var tempString_2 ="";
                        for(var i=0; i<n; i++) {
                            speelterrein = speelterreinen[i];
                            /*console.log(speelterrein);*/
                            tempString_2 += '<div id="speelterrein_id" class="card blue-grey darken-1 z-depth-2">';
                            tempString_2 += '<div class="card-content white-text">';
                            tempString_2 += '<span class="card-title" >' +speelterrein.naam;
                            tempString_2 += '</span>';
                            tempString_2 += '<h5>Functies</h5><p>' + speelterrein.functies;
                            tempString_2 += '<div class="card-action"><a target="_blank" class="waves-effect waves-light btn" href="' + speelterrein.plaats;
                            tempString_2 += '">Locatie</a>';
                            tempString_2 += '</div></div></div>';
                            document.getElementById("speelterrein_id").innerHTML=tempString_2
                        }
                    }else {
                        console.log(Error(xhr.status));
                    }
                    break;
                }

            };
            //4. Open the connection or tunnel to the resource on the url
            xhr.open('GET', this.URLSPEEL, true);
            //5. Make the request to the specified resource
            xhr.send(null);
        }
    };

    App.init();

});


/******************************************************Google maps**********************************/
console.log(speelterrein);
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 14,
        center: new google.maps.LatLng(51.0520781,3.7148216),
        mapTypeId: 'terrain'
    });

}
