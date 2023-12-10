const readFrom = require("./read-input");

const args = process.argv;
const input = readFrom(args);
if (!input) return;

const tiles = input.split("\n").map((line) => line.split(""));
const [startRow, startCol] = [
    tiles.findIndex((r) => r.includes("S")),
    tiles.find((r) => r.includes("S")).indexOf("S"),
];

const getFirstPipe = (row, col) => {
    if (
        0 < row &&
        (tiles[row - 1][col] === "|" ||
            tiles[row - 1][col] === "F" ||
            tiles[row - 1][col] === "7")
    ) {
        return [row - 1, col];
    }

    if (
        row < tiles.length - 1 &&
        (tiles[row + 1][col] === "|" ||
            tiles[row + 1][col] === "J" ||
            tiles[row + 1][col] === "L")
    ) {
        return [row + 1, col];
    }

    if (
        0 < col &&
        (tiles[row][col - 1] === "-" ||
            tiles[row][col - 1] === "L" ||
            tiles[row][col - 1] === "F")
    ) {
        return [row, col - 1];
    }

    if (
        col < tiles[0].length - 1 &&
        (tiles[row][col + 1] === "-" ||
            tiles[row][col + 1] === "J" ||
            tiles[row][col + 1] === "7")
    ) {
        return [row, col + 1];
    }
};

const step = ([row, col], [prevRow, prevCol]) => {
    switch (tiles[row][col]) {
        case "|":
            return row < prevRow ? [row - 1, col] : [row + 1, col];
        case "-":
            return col < prevCol ? [row, col - 1] : [row, col + 1];
        case "L":
            return row === prevRow ? [row - 1, col] : [row, col + 1];
        case "J":
            return row === prevRow ? [row - 1, col] : [row, col - 1];
        case "7":
            return row === prevRow ? [row + 1, col] : [row, col - 1];
        case "F":
            return row === prevRow ? [row + 1, col] : [row, col + 1];
        default:
            console.log("went trough I guess");
            return [row, col];
    }
};

const [firstPipeRow, firstPipeCol] = getFirstPipe(startRow, startCol);

const pipes = [[startRow, startCol]];
const visited = new Set([[startRow, startCol].toString()]);

let prev = [startRow, startCol];
let curr = [firstPipeRow, firstPipeCol];
while (!visited.has(curr.toString())) {
    visited.add(curr.toString());
    pipes.push(curr);

    const tmp = curr;
    curr = step(curr, prev);
    prev = tmp;
}

const partOneResult = pipes.length / 2;
console.log(partOneResult);

// thank you stackoverflow
// https://stackoverflow.com/questions/16285134/calculating-polygon-area#:~:text=function%20polygonArea(X%2C%20Y%2C,%2C%206%2C%209%2C%209%2C
const calcPolygonArea = (vertices) => {
    let total = 0;

    for (let i = 0, l = vertices.length; i < l; i++) {
        const addX = vertices[i][0];
        const addY = vertices[i == vertices.length - 1 ? 0 : i + 1][1];
        const subX = vertices[i == vertices.length - 1 ? 0 : i + 1][0];
        const subY = vertices[i][1];

        total += addX * addY * 0.5;
        total -= subX * subY * 0.5;
    }

    return Math.abs(total);
};

// magic
const partTwoResult = calcPolygonArea(pipes) - pipes.length / 2 + 1;
console.log(partTwoResult);
