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

        var endDate = new Date().getTime() + (10 * 3000);
        sessionStorage.setItem('countDown', endDate);
        startClock(endDate);
        $('#asideInfo').hide();
        $('#canvas').hide();
        $('#map').removeClass('col-md-9').addClass('col-md-12');
        $('#timing').fadeIn("slow");

    });

    if (sessionStorage.getItem('countDown')) {
        startClock(sessionStorage.countDown);
    }

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



