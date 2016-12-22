$(document).ready(function () {
    $(".button-collapse").sideNav();

});

// naam en pas register
var regiName = document.getElementById('regname');
var regiPw = document.getElementById('regpw');

function store() {
    localStorage.setItem('uName', regiName.value);
    localStorage.setItem('pw', regiPw.value);
    window.location.href = "login.html"
}

function check() {


    var storedName = localStorage.getItem('uName');
    var storedPw = localStorage.getItem('pw');


    var userName = document.getElementById('logname');
    var userPw = document.getElementById('logpw');


    if (userName.value == storedName && userPw.value == storedPw) {
        alert('You are loged in.');
    } else {
        alert('Gebruiker of wachtwoord wordt niet herkend.' + userName);
    }
}

$(document).ready(function () {
    $('.parallax').parallax();
});

var prevMarkers = [], newMarkers = [];


/*Scholen************************************************************************************************/
function ready(cb) {
    /in/.test(document.readyState)
        ? setTimeout(ready.bind(null, cb), 90)
        : cb();
}


ready(function () {

    var App = {
        "init": function () {
            this.URLSCHOOL = '/data/basisschool.json'; // Cache the url with random users in variable URLRANDOMUSERME
            this.filter = null;
            this.loadDataSchool(); // Load SCHOOL Data
        },
        "loadDataSchool": function () {
            //1. Create a XMLHttpRequest object (Send to and load data from a WebAPI)
            var xhr = typeof XMLHttpRequest != undefined
                ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');

            //2. Declare the type of the response
            xhr.responseType = 'json';
            //3. Listen to the changes in states within the connection
            xhr.onreadystatechange = function () {
                switch (xhr.readyState) {
                    case 0:
                        console.log('UNSENT');
                        break;
                    case 1:
                        console.log('OPENED');
                        break;
                    case 2:
                        console.log('HEADERS RECEIVED');
                        console.log(this.getAllResponseHeaders());
                        break;
                    case 3:
                        console.log('LOADING');
                        break;
                    case 4:
                    default:
                        console.log('LOADED');
                        LoadScholenFromJSON();
                        initOnClickEventsFilters();
                        updateScholenToHtml(getFilteredScholen(alleScholen));
                        break;
                }

            };
            initOnClickEventsFilters = function () {
                document.getElementById("katholiek_onderwijs").onclick = function () {
                    updateScholenToHtml(getFilteredScholen(alleScholen));
                };
                document.getElementById("stedelijk_onderwijs").onclick = function () {
                    updateScholenToHtml(getFilteredScholen(alleScholen));
                };
                document.getElementById("oko").onclick = function () {
                    updateScholenToHtml(getFilteredScholen(alleScholen));
                };
                document.getElementById("go").onclick = function () {
                    updateScholenToHtml(getFilteredScholen(alleScholen));
                };
                document.getElementById("katholiek_onderwijs_filter").onclick = function () {
                    updateScholenToHtml(getFilteredScholen(alleScholen));
                };
                document.getElementById("stedelijk_onderwijs_filter").onclick = function () {
                    updateScholenToHtml(getFilteredScholen(alleScholen));
                };
                document.getElementById("oko_filter").onclick = function () {
                    updateScholenToHtml(getFilteredScholen(alleScholen));
                };
                document.getElementById("go_filter").onclick = function () {
                    updateScholenToHtml(getFilteredScholen(alleScholen));
                };
            };
            var alleScholen;
            LoadScholenFromJSON = function () {
                //If status equals 200 then everything is ok else nok
                if (xhr.status == 200) {
                    console.log('OK');
                    //Get the received data --> response
                    var data = (!xhr.responseType) ? JSON.parse(xhr.response) : xhr.response;
                    alleScholen = data.kml.Document.Folder.Placemark, n = alleScholen.length, school = null;
                } else {
                    console.log(Error(xhr.status));
                }
            };
            getFilteredScholen = function () {
                var filteredScholen = [];
                var school;
                console.log(document.getElementById("katholiek_onderwijs_filter").checked);
                if (document.getElementById("katholiek_onderwijs").checked === true || document.getElementById("katholiek_onderwijs_filter").checked === true) {
                    for (var i = 0; i < alleScholen.length; i++) {
                        school = alleScholen[i];
                        if (school.ExtendedData.SchemaData.SimpleData[9]['#text'] === "Katholiek Onderwijs") {
                            filteredScholen.push(school);
                        }
                    }
                }
                if (document.getElementById("stedelijk_onderwijs").checked === true || document.getElementById("stedelijk_onderwijs_filter").checked === true) {
                    for (var i = 0; i < alleScholen.length; i++) {
                        school = alleScholen[i];
                        if (school.ExtendedData.SchemaData.SimpleData[9]['#text'] === "Stedelijk Onderwijs Gent") {
                            filteredScholen.push(school);
                        }
                    }
                }
                if (document.getElementById("oko").checked === true || document.getElementById("oko_filter").checked === true) {
                    for (var i = 0; i < alleScholen.length; i++) {
                        school = alleScholen[i];
                        if (school.ExtendedData.SchemaData.SimpleData[9]['#text'] === "Overleg Kleine Onderwijsverstrekkers") {
                            filteredScholen.push(school);
                        }
                    }
                }
                if (document.getElementById("go").checked === true || document.getElementById("go_filter").checked === true) {
                    for (var i = 0; i < alleScholen.length; i++) {
                        school = alleScholen[i];
                        if (school.ExtendedData.SchemaData.SimpleData[9]['#text'] === "GO! onderwijs van de Vlaamse Gemeenschap") {
                            filteredScholen.push(school);
                        }
                    }
                }
                if (filteredScholen.length === 0) {
                    return alleScholen;
                } else {
                    return filteredScholen;
                }

            };
            updateScholenToHtml = function (scholen) {
                var n = scholen.length;
                var tempString = "";
                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 300
                });
                newMarkers = [];
                for (var i = 0; i < n; i++) {
                    school = scholen[i];

                    var aantalScholen = '<h6>Aantal scholen: ' + n + '</h6>';
                    /*var school_naam =(school.ExtendedData.SchemaData.SimpleData[i]['#text']);*/

                    tempString += '<div id="school_name" class="card blue-grey darken-1 z-depth-2">';
                    tempString += '<div class="card-content white-text">';
                    tempString += '<span class="card-title" >' + school.ExtendedData.SchemaData.SimpleData[3]['#text'];
                    tempString += '</span>';
                    tempString += '<p>' + school.ExtendedData.SchemaData.SimpleData[1]['#text'] + ' ' + school.ExtendedData.SchemaData.SimpleData[14]['#text'];
                    tempString += '</p>';
                    tempString += '<p><a href="mailto:' + school.ExtendedData.SchemaData.SimpleData[16]['#text'];
                    tempString += '">E-mail</a></br>';
                    tempString += '<a href="tel:' + school.ExtendedData.SchemaData.SimpleData[15]['#text'];
                    tempString += '">' + school.ExtendedData.SchemaData.SimpleData[15]['#text'];
                    tempString += '</a>';
                    tempString += '<div class="card-action">';
                    tempString += '<a target="_blank" class="waves-effect waves-light btn" href="' + school.ExtendedData.SchemaData.SimpleData[17]['#text'];
                    tempString += '">Website</a>';
                    tempString += '</div>';
                    tempString += '</div>';
                    tempString += '</div>';
                    document.getElementById("school_name").innerHTML = tempString;
                    document.getElementById("aantal_scholen").innerHTML = aantalScholen;

                    /*console.log(school.Point.coordinates);*/


                    /*Googlemaps*/
                    var latLng = new google.maps.LatLng(school.Point.coordinates.split(',')[1],school.Point.coordinates.split(',')[0]);
                    var contentString ='<div id="mapContent">' +  '<p id="title_map">' + title + '</p>' + '<p>' + adres + '</div>';
                    var title = school.ExtendedData.SchemaData.SimpleData[3]['#text'];
                    var adres = school.ExtendedData.SchemaData.SimpleData[1]['#text'] + ' ' + school.ExtendedData.SchemaData.SimpleData[14]['#text'];
                    var marker = new google.maps.Marker({
                        position: latLng,
                        icon: '/assets/marker/marker_school-01.png',
                        title: title,
                        animation: google.maps.Animation.DROP,
                        map: map,
                        html: contentString
                    });

                    marker.addListener('click', function() {
                        infowindow.setContent(this.html);
                        infowindow.open(map, this);
                    });

                    newMarkers.push(marker);


                }

                for(var j=0;j<prevMarkers.length;j++) {
                    prevMarkers[j].setMap(null);
                }
                prevMarkers = newMarkers;
            };
            //4. Open the connection or tunnel to the resource on the url
            xhr.open('GET', this.URLSCHOOL, true);
            //5. Make the request to the specified resource
            xhr.send(null);
        }
    };
    App.init();
});


/*Paralax**************************************************************************************/

$(document).ready(function () {
    $('.parallax').parallax();
});



/*Speelterein**************************************************************************************/

ready(function () {

    var App = {
        "init": function () {
            this.URLSPEEL = '/data/speelterrein.json'; // Cache the url with random users in variable URLRANDOMUSERME
            this.loadDataSpeel(); // Load SPEEL Data
        },
        "loadDataSpeel": function () {
            //1. Create a XMLHttpRequest object (Send to and load data from a WebAPI)
            var xhr = typeof XMLHttpRequest != undefined
                ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');
            //2. Declare the type of the response
            xhr.responseType = 'json';
            //3. Listen to the changes in states within the connection
            xhr.onreadystatechange = function () {
                switch (xhr.readyState) {
                    case 0:
                        console.log('UNSENT');
                        break;
                    case 1:
                        console.log('OPENED');
                        break;
                    case 2:
                        console.log('HEADERS RECEIVED');
                        console.log(this.getAllResponseHeaders());
                        break;
                    case 3:
                        console.log('LOADING');
                        break;
                    case 4:
                    default:
                        console.log('LOADED');
                        //If status equals 200 then everything is ok else nok
                        if (xhr.status == 200) {
                            console.log('OK');
                            //Get the received data --> response

                            var data = (!xhr.responseType) ? JSON.parse(xhr.response) : xhr.response;
                            var speelterreinen = data.speelterreinen, n = speelterreinen.length, speelterrein = null;
                            var tempString_2 = "";
                            var infowindow = new google.maps.InfoWindow({
                                content: contentString,
                                maxWidth: 300
                            });

                            for (var i = 0; i < n; i++) {
                                speelterrein = speelterreinen[i];
                                console.log(speelterrein.length);
                                tempString_2 += '<div id="speelterrein_id" class="card blue-grey darken-1 z-depth-2">';
                                tempString_2 += '<div class="card-content white-text">';
                                tempString_2 += '<span class="card-title" >' + speelterrein.naam;
                                tempString_2 += '</span>';
                                tempString_2 += '<h5>Functies</h5><p>' + speelterrein.functies;
                                tempString_2 += '<div class="card-action"><a target="_blank" class="waves-effect waves-light btn" href="' + speelterrein.plaats;
                                tempString_2 += '">Locatie</a>';
                                tempString_2 += '</div></div></div>';
                                console.log(speelterrein.functies);
                                document.getElementById("speelterrein_id").innerHTML = tempString_2;
                                /*Googlemaps*/
                                var latLng = new google.maps.LatLng(speelterrein.coördinaten.split(',')[0], speelterrein.coördinaten.split(',')[1]);
                                var contentString ='<div id="mapContent">' +  '<p id="title_map">' + speelterrein.naam + '</p>' + '<p>' + speelterrein.functies + '</div>';

                                var marker = new google.maps.Marker({
                                    position: latLng,
                                    icon: '/assets/marker/marker_speel.png',
                                    title: speelterrein.naam,
                                    animation: google.maps.Animation.DROP,
                                    map: map,
                                    html: contentString
                                });
                                marker.addListener('click', function() {
                                    infowindow.setContent(this.html);
                                    infowindow.open(map, this);
                                });


                            }
                        } else {
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
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 12,
        center: new google.maps.LatLng(51.0546539,3.7235797),
        mapTypeId: 'terrain'
    });

}

/******************************************************Like Button**********************************/

function clickCounter() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
        document.getElementById("result").innerHTML = "Dit project is al " + localStorage.clickcount + " keer geliked!";
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

function clickCounter2() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount2) {
            localStorage.clickcount2 = Number(localStorage.clickcount2)+1;
        } else {
            localStorage.clickcount2 = 1;
        }
        document.getElementById("result2").innerHTML = "Dit project is al " + localStorage.clickcount2 + " keer geliked!";
    } else {
        document.getElementById("result2").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

function clickCounter3() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount3) {
            localStorage.clickcount3 = Number(localStorage.clickcount3)+1;
        } else {
            localStorage.clickcount3 = 1;
        }
        document.getElementById("result3").innerHTML = "Dit project is al " + localStorage.clickcount3 + " keer geliked!";
    } else {
        document.getElementById("result3").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

