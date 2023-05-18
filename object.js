var object = function(x, y, z, w, h, d){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.d = d;
    this.color_wall;
    this.shape = createCuboid(x, y, z, w, h, d);
    this.left_cover = createCuboid(x - 1, y, z, 1, h, d);
    this.right_cover = createCuboid(x + w, y, z, 1, h, d);
    this.shapes = [this.shape, this.left_cover, this.right_cover];
    this.id = "";
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.rt = 0;
    this.gt = 0;
    this.bt = 0;
}

var face_mode = function(){
    var nodes, edges, faces, skippedFaces, aVec, bVec, cVec, dir;
    let shapesCopy = [...shapes];
    let orderedShapes = [];
    push();
    translate(300, 300);
    noStroke();
    let zs = [];
    for (let i = 0; i < shapes.length; i++) {
        nodes = shapes[i].shape.nodes;
        zs[i] = (nodes[0][2] + nodes[7][2]) / 2;
    }
    let index, maxVal;
    while (zs.length) {
        index = 0;
        maxVal = zs[0];
        for (let i = 1; i < zs.length; i++) {
            if (zs[i] > maxVal) {
                index = i;
                maxVal = zs[i];
            }
        }
        orderedShapes.push(shapesCopy[index]);
        shapesCopy.splice(index, 1);
        zs.splice(index, 1);
    }
    for (var shapeNum = 0; shapeNum < orderedShapes.length; shapeNum++) {
        nodes = orderedShapes[shapeNum].shape.nodes;
        edges = orderedShapes[shapeNum].shape.edges;
        faces = orderedShapes[shapeNum].shape.faces;
        for (var f = 0; f < faces.length; f++) {
            aVec = createVector(nodes[faces[f][0]][0],
                nodes[faces[f][0]][1], nodes[faces[f][0]][2]);
            bVec = createVector(nodes[faces[f][1]][0],
                nodes[faces[f][1]][1], nodes[faces[f][1]][2]);
            cVec = createVector(nodes[faces[f][2]][0],
                nodes[faces[f][2]][1], nodes[faces[f][2]][2]);
            dir = p5.Vector.cross(p5.Vector.sub(cVec, aVec),
                p5.Vector.sub(bVec, aVec));
            if (dir.z > 0 && (shapeNum != 1 || f > 1)) {
                if(orderedShapes[shapeNum].id == "window"){
                    fill(0, 255, 255); //front
                }
                else if(orderedShapes[shapeNum].id == "brick"){
                    fill(150, 75, 0); //front
                }else if (orderedShapes[shapeNum].id == "off_brick"){
                    fill(181, 101, 29);
                }
                else if(f == 5){ // top
                    fill(150, 75, 0);
                }else if(f == 4){//bottom
                    fill(255, 255, 255);
                }else if(f == 3){
                    fill(170, 170, 170); //back
                }else if(f == 2){
                    fill(230, 230, 230); //front
                }else if(f == 0){
                    fill(170, 170, 170); //left
                }else{ 
                    fill(230, 230, 230); //right
                }
                beginShape();
                for (let i = 0; i < faces[f].length; i++) {
                    let point = nodes[faces[f][i]];
                    vertex(point[0], point[1]);
                }
                endShape();
            }
        }
        for (var e = 0; e < edges.length; e++) {
            var n0 = edges[e][0];
            var n1 = edges[e][1];
            var node0 = nodes[n0];
            var node1 = nodes[n1];
            line(node0[0], node0[1], node1[0], node1[1]);
        }
    }
    pop();
}
var backgroundColour, nodeColour, edgeColour;
var wire_mode = function (){

    var nodes, edges;
    push();
    translate(300, 300);
    // Draw edges
    stroke(edgeColour);
    for (var shapeNum = 0; shapeNum < wire_shapes.length; shapeNum++) {
        nodes = wire_shapes[shapeNum].shape.nodes;
        edges = wire_shapes[shapeNum].shape.edges;
        for (var e = 0; e < edges.length; e++) {
            var n0 = edges[e][0];
            var n1 = edges[e][1];
            var node0 = nodes[n0];
            var node1 = nodes[n1];
            line(node0[0], node0[1], node1[0], node1[1]);
        }
    }
    // Draw nodes
    fill(nodeColour);
    noStroke();
    for (var shapeNum = 0; shapeNum < wire_shapes.length; shapeNum++) {
        nodes = wire_shapes[shapeNum].shape.nodes;
        for (var n = 0; n < nodes.length; n++) {
            var node = nodes[n];
            ellipse(node[0], node[1], nodeSize, nodeSize);
        }
    }
    pop();
}