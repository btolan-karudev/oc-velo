$(function () {
    //initialize map
    initMap();
    // call signatureCapture function
    Signature.signatureCapture();

    //signature controls
    $('#reserver').click(function () {

        $('#canva').fadeIn("slow");
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


        var endDate = new Date().getTime() + (10 * 1000);

        startClock(endDate);
        sessionStorage.setItem('countDown', endDate);
        $('#timing').fadeIn("slow");


    });

    //slider controls
    $('#checkbox').change(function () {
        setInterval(function () {
            moveRight();
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



