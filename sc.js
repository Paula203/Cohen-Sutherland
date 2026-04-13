const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let xmin = 150, ymin = 100;
let xmax = 450, ymax = 400;

const INSIDE = 0;
const LEFT = 1;
const RIGHT = 2;
const BELOW = 4;
const ABOVE = 8; 

let lines = [];

function updateViewport() {
    xmin = parseFloat(document.getElementById("xmin").value);
    ymin = parseFloat(document.getElementById("ymin").value);
    xmax = parseFloat(document.getElementById("xmax").value);
    ymax = parseFloat(document.getElementById("ymax").value);
    draw();
}

function computeOutCode(x, y) {
    let code = INSIDE;  

    if (x < xmin) code |= LEFT;
    else if (x > xmax) code |= RIGHT;

    if (y < ymin) code |= BOTTOM;
    else if (y > ymax) code |= TOP;

    return code;
}

function cohenSutherland(x1, y1, x2, y2) {
    let outcode1 = computeOutCode(x1, y1);
    let outcode2 = computeOutCode(x2, y2);
    let accept = false;

    while (true) {
        if (!(outcode1 | outcode2)) {
            accept = true;
            break;
        } else if (outcode1 & outcode2) {
            break;
        } else {
            let x, y;
            let outcodeOut = outcode1 ? outcode1 : outcode2;

            if (outcodeOut & TOP) {
                x = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1);
                y = ymax;
            } else if (outcodeOut & BOTTOM) {
                x = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1);
                y = ymin;
            } else if (outcodeOut & RIGHT) {
                y = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1);
                x = xmax;
            } else if (outcodeOut & LEFT) {
                y = y1 + (y2 - y1) * (xmin - x1) / (x2 - x1);
                x = xmin;
            }

            if (outcodeOut === outcode1) {
                x1 = x;
                y1 = y;
                outcode1 = computeOutCode(x1, y1);
            } else {
                x2 = x;
                y2 = y;
                outcode2 = computeOutCode(x2, y2);
            }
        }
    }

    return accept ? [x1, y1, x2, y2] : null;
}

function drawWindow() {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);

    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText(
    `Coord. VP = (${xmin}, ${ymin}) - (${xmax}, ${ymax})`, 
    10,
    20
    );
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc (x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}


