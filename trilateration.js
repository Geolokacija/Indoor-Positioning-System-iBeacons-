
window.onload = init();

var canvas, ctx;

function init(ijjd, txUq, hjQc) {
        canvas = document.getElementById("canvas1");
        ctx = canvas.getContext("2d");

        var beacon1 = ijjd;
        var beacon2 = txUq;
        var beacon3 = hjQc;

        //raudonas
        p1 = {
            x: 725,
            y: 0,
            z: 0,
            r: beacon1
        };
        //žalias
        p2 = {
            x: 0,
            y: 0,
            z: 0,
            r: beacon2
        };
        //mėlynas
        p3 = {
            x: 725,
            y: 550,
            z: 40,
            r: beacon3
        };

        //siunčia taškų koordinates į funkciją, kuri apskaičiuoja susikirtimą
        p4 = trilaterate(p1, p2, p3);

        //tikrina ar nusiūsti kintamieji teisingi
        if (p4 !== null) {
          //nustatoma canvas background spalva (#111 juoda, #fff balta)
            ctx.fillStyle = "#111";
        } else {
          //padaro canvas background raudona, jei pagal gaunamus signalus neįmanoma nubraižyti ir rasti vietos
            ctx.fillStyle = "#800";
        }
        //uždeda aukščiau nustatyta spalvą ant canvas
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //raudonas apskritimas ir taškas P1
        ctx.fillStyle = "#f00";
        ctx.strokeStyle = ctx.fillStyle;
        ctx.fillRect(20 + p1.x - 2, 20 + p1.y - 2, 5, 5);
        ctx.beginPath();
        ctx.arc(20 + p1.x, 20 + p1.y, p1.r, 0, 2 * Math.PI);
        ctx.stroke();

        //žalias apskritimas ir taškas P2
        ctx.fillStyle = "#0f0";
        ctx.strokeStyle = ctx.fillStyle;
        ctx.fillRect(20 + p2.x - 2, 20 + p2.y - 2, 5, 5);
        ctx.beginPath();
        ctx.arc(20 + p2.x, 20 + p2.y, p2.r, 0, 2 * Math.PI);
        ctx.stroke();

        //mėlynas apskritimas ir taškas
        ctx.fillStyle = "#00f";
        ctx.strokeStyle = ctx.fillStyle;
        ctx.fillRect(20 + p3.x - 2, 20 + p3.y - 2, 5, 5);
        ctx.beginPath();
        ctx.arc(20 + p3.x, 20 + p3.y, p3.r, 0, 2 * Math.PI);
        ctx.stroke();

        if (p4 !== null) {
            if (p4 instanceof Array) {
                //raudonas vidurio taškas
                ctx.fillStyle = "#f00";
                ctx.fillRect(20 + p4[0].x - 2, 20 + p4[0].y - 2, 5, 5);

                //geltonas taškas
                ctx.fillStyle = "#ff0";
                ctx.fillRect(20 + p4[1].x - 2, 20 + p4[1].y - 2, 5, 5);
            } else {
                ctx.fillStyle = "#fff";
                ctx.fillRect(20 + p4.x - 2, 20 + p4.y - 2, 5, 5);
            }
        }
}

function trilaterate(p1, p2, p3, return_middle) {

    function sqr(a) {
        return a * a;
    }

    function norm(a) {
        return Math.sqrt(sqr(a.x) + sqr(a.y) + sqr(a.z));
    }

    function dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    function vector_subtract(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y,
            z: a.z - b.z
        };
    }

    function vector_add(a, b) {
        return {
            x: a.x + b.x,
            y: a.y + b.y,
            z: a.z + b.z
        };
    }

    function vector_divide(a, b) {
        return {
            x: a.x / b,
            y: a.y / b,
            z: a.z / b
        };
    }

    function vector_multiply(a, b) {
        return {
            x: a.x * b,
            y: a.y * b,
            z: a.z * b
        };
    }

    function vector_cross(a, b) {
        return {
            x: a.y * b.z - a.z * b.y,
            y: a.z * b.x - a.x * b.z,
            z: a.x * b.y - a.y * b.x
        };
    }

    var ex, ey, ez, i, j, d, a, x, y, z, p4;

    ex = vector_divide(vector_subtract(p2, p1), norm(vector_subtract(p2, p1)));

    i = dot(ex, vector_subtract(p3, p1));
    a = vector_subtract(vector_subtract(p3, p1), vector_multiply(ex, i));
    ey = vector_divide(a, norm(a));
    ez = vector_cross(ex, ey);
    d = norm(vector_subtract(p2, p1));
    j = dot(ey, vector_subtract(p3, p1));

    x = (sqr(p1.r) - sqr(p2.r) + sqr(d)) / (2 * d);
    y = (sqr(p1.r) - sqr(p3.r) + sqr(i) + sqr(j)) / (2 * j) - (i / j) * x;
    z = Math.sqrt(sqr(p1.r) - sqr(x) - sqr(y));

    // no solution found
    if (isNaN(z)) {
        return null;
    }

    a = vector_add(p1, vector_add(vector_multiply(ex, x), vector_multiply(ey, y)))
    p4a = vector_add(a, vector_multiply(ez, z));
    p4b = vector_subtract(a, vector_multiply(ez, z));

    // ctx.beginPath();
    // ctx.arc(95,50,100,0,2*Math.PI);
    // ctx.stroke();

    if (z == 0 || return_middle) {
      //jei visos trys linijos susikerta tiksliai
        return a;
    } else {
      //jei linijos nesusikerta tikslei
        return [p4a, p4b];
    }

}

  function currrentPlaceCoordinates() {
    return p4a;
  }
