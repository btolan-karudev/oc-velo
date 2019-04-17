//mapGoogle

var map;
var stations = [];
var markers = [];
var icons;
var iconBase;

$('#timing').hide();

var savedTime = sessionStorage.getItem('countDown') || false;

if (savedTime) {
    startClock(savedTime);
    $('#timing').show();
}

$('#asideInfo').hide();
$('#canvas').hide();


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 45.76404,
            lng: 4.83566
        },
        zoom: 13,
        minZoom: 11,
        maxZoom: 22,
    });

    //appele jcdevaux avec ajax
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=c59b83194264e938b79a66af6d880dda6d6a2c8b",
        function (reponse) {
            stations = JSON.parse(reponse);

            iconBase = 'images/';
            icons = {
                dispo: {
                    icon: iconBase + 'if_Paul-07_2534339.png'
                },
                limit: {
                    icon: iconBase + 'if_Jee-07_2180492.png'
                },
                nada: {
                    icon: iconBase + 'if_Facebook_UI-07_2344289.png'
                },


            };

            for (var i = 0; i < stations.length; i++) {
                // Récupère la position du tableau de localisation.
                var position = stations[i].position;
                var name = stations[i].name;
                var address = stations[i].address;
                var status = stations[i].status;
                var available_bike_stands = stations[i].available_bike_stands;
                var available_bikes = stations[i].available_bikes;
                var stat;


                var resOK = false;
                var iconColor;
                if (status === "CLOSED") {
                    iconColor = "nada";
                } else if ((status === "OPEN") && (available_bikes > 0)) {
                    iconColor = "dispo";
                    resOK = true;
                } else if ((status === "OPEN") && (available_bikes === 0)) {
                    iconColor = "limit";
                }


                var marker = new google.maps.Marker({
                    map: map,
                    position: position,
                    title: name,
                    address: address,
                    status: status,
                    available_bike_stands: available_bike_stands,
                    available_bikes: available_bikes,
                    animation: google.maps.Animation.DROP,
                    id: i,
                    icon: icons[iconColor].icon,
                    reservation: resOK
                });

                markers.push(marker);

                marker.addListener('click', function () {
                        if (sessionStorage.getItem('countDown')) {
                            $('#infoReservation').removeClass('d-none');
                            setInterval(function () {
                                $('#infoReservation').addClass('d-none');
                            }, 10000)

                        } else {
                            if (this.reservation === true) {
                                $("#reserver").prop('disabled', false);
                            } else {
                                $("#reserver").prop('disabled', true);
                            }

                            $('#map').removeClass('col-md-12').addClass('col-md-9');
                            $('#asideInfo').fadeIn("slow");
                            $('#canvas').hide();
                            Signature.signatureClear();
                            $("#resaInfo").empty().append("<br> Adresse: " + this.address + "<br> Status: "
                                + this.status + "<br> Nombre de velo :" + this.available_bikes);
                        }
                    }
                );

            }

            var markerCluster = new MarkerClusterer(map, markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });

        }
    );
}

// requete ajax generique
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur URL " + url);
    });
    req.send(null);
}

