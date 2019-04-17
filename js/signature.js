var canvas = document.getElementById("newSignature");
var context = canvas.getContext("2d");
var disableSave = true;
var pixels = [];
// var cpixels = [];
var xyLast = {};
var xyAddLast = {};
var calculate = false;


var Signature = {

    signatureCapture: function () {

        canvas.width = 276;
        canvas.height = 180;
        context.fillStyle = "#fff";
        context.strokeStyle = "#444";
        context.lineWidth = 1.5;
        context.lineCap = "round";
        context.fillRect(0, 0, canvas.width, canvas.height);
        canvas.addEventListener('touchstart', Signature.on_mousedown, false);
        canvas.addEventListener('mousedown', Signature.on_mousedown, false);
    },

    // signatureSave: function () {
    //     var canvas = document.getElementById("newSignature"); // save canvas image as data url (png format by default)
    //     var dataURL = canvas.toDataURL("image/png");
    //     document.getElementById("saveSignature").src = dataURL;
    // },

    signatureClear: function () {
        var canvas = document.getElementById("newSignature");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    },

    remove_event_listeners: function () {
        canvas.removeEventListener('mousemove', Signature.on_mousemove, false);
        canvas.removeEventListener('mouseup', Signature.on_mouseup, false);
        canvas.removeEventListener('touchmove', Signature.on_mousemove, false);
        canvas.removeEventListener('touchend', Signature.on_mouseup, false);

        document.body.removeEventListener('mouseup', Signature.on_mouseup, false);
        document.body.removeEventListener('touchend', Signature.on_mouseup, false);
    },

    get_coords: function (e) {
        var x, y;

        if (e.changedTouches && e.changedTouches[0]) {
            var offsety = canvas.offsetTop || 0;
            var offsetx = canvas.offsetLeft || 0;

            x = e.changedTouches[0].pageX - offsetx;
            y = e.changedTouches[0].pageY - offsety;
        } else if (e.layerX || 0 == e.layerX) {
            x = e.layerX;
            y = e.layerY;
        } else if (e.offsetX || 0 == e.offsetX) {
            x = e.offsetX;
            y = e.offsetY;
        }

        return {
            x: x,
            y: y
        };
    },

    on_mousedown: function (e) {
        e.preventDefault();
        e.stopPropagation();

        canvas.addEventListener('mouseup', Signature.on_mouseup, false);
        canvas.addEventListener('mousemove', Signature.on_mousemove, false);
        canvas.addEventListener('touchend', Signature.on_mouseup, false);
        canvas.addEventListener('touchmove', Signature.on_mousemove, false);
        document.body.addEventListener('mouseup', Signature.on_mouseup, false);
        document.body.addEventListener('touchend', Signature.on_mouseup, false);

        empty = false;
        var xy = Signature.get_coords(e);
        context.beginPath();
        pixels.push('moveStart');
        context.moveTo(xy.x, xy.y);
        pixels.push(xy.x, xy.y);
        xyLast = xy;
    },

    on_mousemove: function (e, finish) {
        e.preventDefault();
        e.stopPropagation();

        var xy = Signature.get_coords(e);
        var xyAdd = {
            x: (xyLast.x + xy.x) / 2,
            y: (xyLast.y + xy.y) / 2
        };

        if (calculate) {
            var xLast = (xyAddLast.x + xyLast.x + xyAdd.x) / 3;
            var yLast = (xyAddLast.y + xyLast.y + xyAdd.y) / 3;
            pixels.push(xLast, yLast);
        } else {
            calculate = true;
        }

        context.quadraticCurveTo(xyLast.x, xyLast.y, xyAdd.x, xyAdd.y);
        pixels.push(xyAdd.x, xyAdd.y);
        context.stroke();
        context.beginPath();
        context.moveTo(xyAdd.x, xyAdd.y);
        xyAddLast = xyAdd;
        xyLast = xy;

    },

    on_mouseup: function (e) {
        Signature.remove_event_listeners();
        disableSave = false;
        context.stroke();
        pixels.push('e');
        calculate = false;
    },


};

