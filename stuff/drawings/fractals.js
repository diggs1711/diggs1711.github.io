(function() {
    var cx = document.querySelector("canvas").getContext("2d");
    cx.fillStyle = "#611800"

    function branch(length, angle, scale) {
        cx.fillRect(0, 0, 1, length);
        

        if(length < 15)
        	cx.fillStyle = "#04BF07"

        if (length < 8)
            return;

        cx.save();
        cx.translate(0, length);
        cx.rotate(-angle);

        branch(length * scale, angle, scale);

        cx.rotate(2 * angle);

        branch(length * scale, angle, scale);

        cx.restore();
    }

    cx.translate(300, 0);
    branch(60, 0.5, 0.8);

})();
