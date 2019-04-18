$(function () {
    //initialize map
    initMap();
    // call signatureCapture function
    Signature.signatureCapture();

    //signature controls
    $('#reserver').click(function () {

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
    $('#valid').click(function () {
        sessionStorage.clear();
        var endDate = new Date().getTime() + (20*60*1000);
        sessionStorage.setItem('countDown', endDate);
        startClock(endDate);
        $('#asideInfo').hide();
        $('#canvas').hide();
        $('#map').removeClass('col-md-9').addClass('col-md-12');
        $('#timing').delay(1000).fadeIn(600);

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
        }, 3000);
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



