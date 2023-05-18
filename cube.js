var createCuboid = function (x, y, z, w, h, d) {
    var nodes = [
        [x, y, z],
        [x, y, z + d],
        [x, y + h, z],
        [x, y + h, z + d],
        [x + w, y, z],
        [x + w, y, z + d],
        [x + w, y + h, z],
        [x + w, y + h, z + d]
    ];
    var edges = [
        [0, 1],
        [1, 3],
        [3, 2],
        [2, 0],
        [4, 5],
        [5, 7],
        [7, 6],
        [6, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7]
    ];
    var faces = [
        [0, 1, 3, 2],
        [4, 6, 7, 5],
        [0, 2, 6, 4],
        [1, 5, 7, 3],
        [2, 3, 7, 6],
        [0, 4, 5, 1]
    ];
    return {
        'nodes': nodes,
        'edges': edges,
        'faces': faces
    };
};