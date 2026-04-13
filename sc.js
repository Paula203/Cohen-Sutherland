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