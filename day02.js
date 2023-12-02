const readFrom = require("./read-input");

const args = process.argv;
const input = readFrom(args);
if (!input) return;

const possibleMax = {
    red: 12,
    green: 13,
    blue: 14,
};

const partOneResult = input.split("\n").reduce((idSums, line, i) => {
    const cubes = line
        .split(": ")[1]
        .split("; ")
        .map((set) => set.split(", ").map((cube) => cube.split(" ")))
        .flat();

    for (let [val, color] of cubes) {
        if (possibleMax[color] < parseInt(val)) {
            return idSums;
        }
    }

    return idSums + i + 1;
}, 0);

console.log(partOneResult);

const partTwoResult = input.split("\n").reduce((powerSums, line) => {
    const possibleMin = {
        red: 1,
        green: 1,
        blue: 1,
    };

    const cubes = line
        .split(": ")[1]
        .split("; ")
        .map((set) => set.split(", ").map((cube) => cube.split(" ")))
        .flat();

    for (let [val, color] of cubes) {
        possibleMin[color] =
            parseInt(val) > possibleMin[color] ? parseInt(val) : possibleMin[color];
    }

    const power = Object.values(possibleMin).reduce((a, b) => a * b);

    return powerSums + power;
}, 0);

console.log(partTwoResult);
