$(function () {

    window.onload = function () {
        //initialize map
        initMap();

        document.getElementById('formID').addEventListener('submit', function (e) {
            // This will fire when the form submit button is pressed,
            // or when the user presses enter inside of a field.

            // Get the value from the username field.
            var nameInput = document.getElementById('name').value;
            var surnameInput = document.getElementById('surname').value;

            //localStorage name and surname
            localStorage.setItem('name', nameInput);
            localStorage.setItem('surname', surnameInput);

        });

        if (localStorage.getItem('name') && localStorage.getItem('surname')) {
            console.log(localStorage.getItem('surname'));
            $('#name').val(localStorage.getItem('name'));
            $('#surname').val(localStorage.getItem('surname'));

        }

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
    $('#reserver').click(function (e) {
        e.preventDefault();
        $('#canvas').fadeIn("slow");
        $('#valid').hide();
        $('#reset').hide();
    });
    $('#newSignature').click(function () {
        $('#valid').fadeIn("slow");
        $('#reset').fadeIn("slow");
    });
    $('#reset').click(function () {
        Signature.signatureClear();
        $('#valid').hide();
    });
    $('#valid').click(function (e) {
        e.preventDefault();
        sessionStorage.clear();
        var endDate = new Date().getTime() + (20 * 60 * 1000);
        sessionStorage.setItem('countDown', endDate);
        startClock(endDate);
        $('#asideInfo').hide();
        $('#canvas').hide();
        $('#map').removeClass('col-md-9').addClass('col-md-12');
        $([document.documentElement, document.body]).animate({
            scrollTop: $('#timing').delay(1000).fadeIn(600).offset().bottom
        }, 500);

    });

    if (sessionStorage.getItem('countDown')) {
        startClock(sessionStorage.countDown);
    }

    $('#cancelReservation').click(function () {
        $('#infoReservation').addClass('d-none');
        sessionStorage.clear();
        clearInterval(timeInterval);
        $('#timing').hide();
    });

    // cancelReservation();

    //slider controls
    $('#checkbox').change(function () {
        setInterval(function () {
            Slider.moveRight();
        }, 5000);
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



