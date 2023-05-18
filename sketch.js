/*
Project 11 - 3D
This is a 3D model of a house on a 600x600 canvas. I used a 600x600 canvas so that it is easier to see the house.
There are two modes (face mode and wire mode). Face mode allows the user to see a colored version of the home
and wire mode allows the user to see the wire frame of the house by pressing enter 
*/
var backgroundColour, nodeColour, edgeColour;
var nodeSize = 8;
var base;
var base_left_cover;
var base_right_cover;
var base_back_cover;

var topFloor;
var topFloor_left_cover;
var topFloor_right_cover;
var topFloor_back_cover;

var topFloor_roof;
var topFloor_back;
var topFloor_roof_back;
var window_front;

var shapes = [];
var wire_shapes = [];

var isFaceMode;
function setup() {
    createCanvas(600, 600);
    fill(0, 0, 0);
    angleMode(DEGREES);
    isFaceMode = true;
    backgroundColour = color(255, 255, 255);
    nodeColour = color(40, 168, 107);
    edgeColour = color(34, 68, 204);

    //SET UP SHAPES
    //x, y, z, w, h, d
    base = new object(-160, -20, -20, 310, 130, 250);
    base.id = "brick"
    base_left_cover = new object(base.x - 1, base.y, base.z, 1, base.h, base.d);
    base_left_cover.id = "brick";
    base_right_cover = new object(base.x + base.w, base.y, base.z, 1, base.h, base.d);
    base_right_cover.id = "brick";
    base_back_cover = new object(base.x, base.y, base.z + base.d + 1, base.w, base.h, 1);
    base_back_cover.id = "back_wall";
    base_front_cover = new object(base.x, base.y, base.z - 1, base.w, base.h, -1);
    base_front_cover.id = "front_wall";
    base_top_cover = new object(base.x, base.y - 1, base.z, base.w, 1, base.d);
    base_top_cover.id = "top_wall";
    base_bottom_cover = new object(base.x, base.y + base.h, base.z, base.w, 1, base.d);


    topFloor = new object(-30, -120, -50, 200, 100, 100);
    topFloor_left_cover = new object(topFloor.x - 1, topFloor.y, topFloor.z, 1, topFloor.h, topFloor.d);
    topFloor_left_cover.color_wall = "left_wall";
    topFloor_right_cover = new object(topFloor.x + topFloor.w, topFloor.y, topFloor.z, 1, topFloor.h, topFloor.d);
    topFloor_right_cover.color_wall = "right_wall";
    topFloor_back_cover = new object(topFloor.x, topFloor.y, topFloor.z + topFloor.d + 1, topFloor.w, topFloor.h, 1);
    topFloor_back_cover.color_wall = "back_wall";
    topFloor_front_cover = new object(topFloor.x, topFloor.y, topFloor.z - 1, topFloor.w, topFloor.h, -1);
    topFloor_front_cover.id = "front_wall";
    topFloor_top_cover = new object(topFloor.x, topFloor.y - 1, topFloor.z, topFloor.w, 1, topFloor.d);
    topFloor_top_cover.color_wall = "top_wall";
    topFloor_bottom_cover = new object(topFloor.x, topFloor.y + topFloor.h, topFloor.z, topFloor.w, 1, topFloor.d);
    topFloor_bottom_cover.color_wall = "bottom_wall";


    topFloor_back = new object(-140, -120, 50, 300, 100, 200);
    topFloor_back_left_cover = new object(topFloor_back.x - 1, topFloor_back.y, topFloor_back.z, 1, topFloor_back.h, topFloor_back.d);
    topFloor_back_left_cover.color_wall = "left_wall";
    topFloor_back_right_cover = new object(topFloor_back.x + topFloor_back.w, topFloor_back.y, topFloor_back.z, 1, topFloor_back.h, topFloor_back.d);
    topFloor_back_right_cover.color_wall = "right_wall";
    topFloor_back_back_cover = new object(topFloor_back.x, topFloor_back.y, topFloor_back.z + topFloor_back.d + 1, topFloor_back.w, topFloor_back.h, 1);
    topFloor_back_back_cover.color_wall = "back_wall";
    topFloor_back_front_cover = new object(topFloor_back.x, topFloor_back.y, topFloor_back.z - 1, topFloor_back.w, topFloor_back.h, -1);
    topFloor_back_front_cover.id = "brick";
    topFloor_back_top_cover = new object(topFloor_back.x, topFloor_back.y - 1, topFloor_back.z, topFloor_back.w, 1, topFloor_back.d);
    topFloor_back_top_cover.color_wall = "top_wall";
    topFloor_back_bottom_cover = new object(topFloor_back.x, topFloor_back.y + topFloor_back.h, topFloor_back.z, topFloor_back.w, 1, topFloor_back.d);
    topFloor_back_bottom_cover.color_wall = "bottom_wall";

    ledge = new object(160, -60, 50, 75, 40, 200);


    topFloor_roof = new object(-50, -130, -100, 250, 10, 150);
    topFloor_roof_left_cover = new object(topFloor_roof.x - 1, topFloor_roof.y, topFloor_roof.z, 1, topFloor_roof.h, topFloor_roof.d);
    topFloor_roof_left_cover.id = "off_brick";
    topFloor_roof_right_cover = new object(topFloor_roof.x + topFloor_roof.w, topFloor_roof.y, topFloor_roof.z, 1, topFloor_roof.h, topFloor_roof.d);
    topFloor_roof_right_cover.id = "off_brick";
    topFloor_roof_back_cover = new object(topFloor_roof.x, topFloor_roof.y, topFloor_roof.z + topFloor_roof.d + 1, topFloor_roof.w, topFloor_roof.h, 1);
    topFloor_roof_back_cover.id = "off_brick";
    topFloor_roof_front_cover = new object(topFloor_roof.x, topFloor_roof.y, topFloor_roof.z - 1, topFloor_roof.w, topFloor_roof.h, -1);
    topFloor_roof_front_cover.id = "off_brick";
    topFloor_roof_top_cover = new object(topFloor_roof.x, topFloor_roof.y - 1, topFloor_roof.z, topFloor_roof.w, 1, topFloor_roof.d);
    //topFloor_roof_top_cover.id = "off_brick";
    topFloor_roof_bottom_cover = new object(topFloor_roof.x, topFloor_roof.y + topFloor_roof.h, topFloor_roof.z, topFloor_roof.w, 1, topFloor_roof.d);
    topFloor_roof_bottom_cover.id = "off_brick";


    topFloor_roof_back = new object(-160, -130, 50, 375, 10, 250);
    topFloor_roof_back_left_cover = new object(topFloor_roof_back.x - 1, topFloor_roof_back.y, topFloor_roof_back.z, 1, topFloor_roof_back.h, topFloor_roof_back.d);
    topFloor_roof_back_left_cover.id = "off_brick";
    topFloor_roof_back_right_cover = new object(topFloor_roof_back.x + topFloor_roof_back.w, topFloor_roof_back.y, topFloor_roof_back.z, 1, topFloor_roof_back.h, topFloor_roof_back.d);
    topFloor_roof_back_right_cover.id = "off_brick";
    topFloor_roof_back_back_cover = new object(topFloor_roof_back.x, topFloor_roof_back.y, topFloor_roof_back.z + topFloor_roof_back.d + 1, topFloor_roof_back.w, topFloor_roof_back.h, 1);
    topFloor_roof_back_back_cover.id = "off_brick";
    topFloor_roof_back_front_cover = new object(topFloor_roof_back.x, topFloor_roof_back.y, topFloor_roof_back.z - 1, topFloor_roof_back.w, topFloor_roof_back.h, -1);
    topFloor_roof_back_front_cover.id = "off_brick";
    topFloor_roof_back_top_cover = new object(topFloor_roof_back.x, topFloor_roof_back.y - 1, topFloor_roof_back.z, topFloor_roof_back.w, 1, topFloor_roof_back.d);
    //topFloor_roof_back_top_cover.id = "off_brick";
    topFloor_roof_back_bottom_cover = new object(topFloor_roof_back.x, topFloor_roof_back.y + topFloor_roof_back.h, topFloor_roof_back.z, topFloor_roof_back.w, 1, topFloor_roof_back.d);
    topFloor_roof_back_bottom_cover.id = "off_brick";


    window_front = new object(20, -20, -21, 100, 130, 1);
    window_front.id = "window";
    
    window_top_one = new object(-30, -120, -50, 50, 50, 1);
    window_top_one.id = "window";
    window_top_two = new object(100, -120, -50, 70, 50, 1);
    window_top_two.id = "window";

    brick_top = new object(20, -120, -50, 80, 50, 1);
    brick_top.id = "brick";
    brick_base = new object(-160, -20, -21, 180, 130, 1);
    brick_base.id = "brick";

    window_right = new object(160, -120, 50, 1, 100, 200);
    window_right.id = "window";
    window_left = new object(-161, 0, 50, 1, 50, 100);
    window_left.id = "window";

    shapes = [
        window_front, window_top_one, window_top_two, window_left, window_right, brick_top, brick_base, base, base_right_cover, base_top_cover, base_bottom_cover, base_back_cover,
        topFloor, topFloor_left_cover, topFloor_right_cover, topFloor_top_cover, topFloor_bottom_cover, topFloor_back_cover,
        topFloor_back, topFloor_back_left_cover, topFloor_back_top_cover, topFloor_back_bottom_cover, topFloor_back_front_cover, topFloor_back_back_cover,
        topFloor_roof, topFloor_roof_left_cover, topFloor_roof_right_cover, topFloor_roof_top_cover, topFloor_roof_bottom_cover, topFloor_roof_front_cover, topFloor_roof_back_cover,
        topFloor_roof_back, topFloor_roof_back_left_cover, topFloor_roof_back_right_cover, topFloor_roof_back_top_cover, topFloor_roof_back_bottom_cover, topFloor_roof_back_front_cover, topFloor_roof_back_back_cover,
        ledge
        
    ];
    wire_shapes = [base, topFloor, topFloor_back, topFloor_roof, topFloor_roof_back, ledge]
}


function keyPressed() {
    if (keyCode === ENTER && isFaceMode == true ) {
        isFaceMode = false;
    } else if (keyCode === ENTER &&  isFaceMode == false) {
        isFaceMode = true;
    }
  }

var draw = function () {
    background(0, 255,0);
    text("switch between face mode and wire mode by pressing enter", 50, 550);
    if(isFaceMode == true){
        face_mode();
    }else{
        wire_mode();
    }


};
mouseDragged = function () {
    var dx = mouseX - pmouseX;
    var dy = mouseY - pmouseY;
    for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
        var nodes = shapes[shapeNum].shape.nodes;
        rotateY3D(dx, nodes);
        rotateX3D(dy, nodes);
    }
};