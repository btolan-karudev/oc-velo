$(function () {

    //apelle la deuxieme fois le windows onload pour l api de google maps
    window.onload = function () {
        //initialize map
        // Map.isPrototypeOf(google.maps.Map);
        MyMap.initMap();

        //verifier si le local storige est en place pour recuperer le nom et le prenom
        if (localStorage.getItem('name') && localStorage.getItem('surname')) {
            console.log(localStorage.getItem('surname'));
            $('#name').val(localStorage.getItem('name'));
            $('#surname').val(localStorage.getItem('surname'));

        }
        //button reset nom et prenom
        $('#resetName').click(function (e) {
            e.preventDefault();
            localStorage.removeItem('name');
            localStorage.removeItem('surname');
            $('#name').val('');
            $('#surname').val('');
        })


    };


    // call signatureCapture function
    Signature.signatureCapture();

    //signature controls
    //quand on appuie sur le buton reserver affichage de canvas
    $('#reserver').click(function (e) {
        e.preventDefault();
        $('#canvas').fadeIn("slow");
        $('#valid').hide();
        $('#reset').hide();
    });
    //affichager de buton valider et reset signature canvas
    $('#newSignature').click(function () {
        $('#valid').fadeIn("slow");
        $('#reset').fadeIn("slow");
    });
    //reinitialize la signature
    //on poura plus tard sauvgarder la signature en jpeg...
    $('#reset').click(function () {
        Signature.signatureClear();
        $('#valid').hide();
    });
    //le buton principal du asside valider qui controle le declanchement du timer(sessionStorage) nom et le prenom sont presents pour le local storrige
    $('#valid').click(function (e) {
        e.preventDefault();

        var nameInput = document.getElementById('name').value;
        var surnameInput = document.getElementById('surname').value;
        console.log(nameInput);
        if (nameInput !== '' && surnameInput !== '') {
            //localStorage name and surname
            localStorage.setItem('name', nameInput);
            localStorage.setItem('surname', surnameInput);
            sessionStorage.clear();
            var endDate = new Date().getTime() + (20 * 60 * 1000);
            sessionStorage.setItem('countDown', endDate);
            CountDown.startClock(endDate);
            $('#asideInfo').hide();
            $('#canvas').hide();
            $('#map').removeClass('col-md-9').addClass('col-md-12');
            $([document.documentElement, document.body]).animate({
                scrollTop: $('#timing').delay(1000).fadeIn(600).offset().bottom
            }, 500);
        } else {
            alert('Veuillez indiquez votre nom et votre prenom');
        }


    });

    //verifie si le sessionStorage est demarer pour continuer le meme
    if (sessionStorage.getItem('countDown')) {
        CountDown.startClock(sessionStorage.countDown);
    }

    //anuler la reservation
    $('#cancelReservation').click(function () {
        $('#infoReservation').addClass('d-none');
        sessionStorage.clear();
        clearInterval(timeInterval);
        $('#timing').hide();
    });

    //autoplay slider
    var autoplay;
    $('#checkbox').change(function () {

        if ($('#checkbox').is(':checked')) {
            autoplay = setInterval(function () {
                Slider.moveRight();
            }, 5000);
        } else {
            clearInterval(autoplay);
        }


    });


    $('#slider').css({width: slideWidth, height: slideHeight});

    $('#slider ul').css({width: sliderUlWidth, marginLeft: -slideWidth});

    $('#slider ul li:last-child').prependTo('#slider ul');
    $('a.control_prev').click(function () {
        Slider.moveLeft();
    });

    $('a.control_next').click(function () {
        Slider.moveRight();
    });

    $('body').on('keydown', function () {
        Slider.moveRGkey();
    });


});



