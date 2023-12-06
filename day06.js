const readFrom = require("./read-input");

const args = process.argv;
const input = readFrom(args);
if (!input) return;

const timeToDistance = input.split("\n").map((line) =>
    line
        .split(":")[1]
        .trim()
        .split(/\s+/)
        .map((n) => parseInt(n))
);

const partOneResult = timeToDistance[0].reduce((multiplies, time, index) => {
    let waysToBeat = 0;
    for (let i = 0; i < time; i++) {
        const distancePossible = (time - i) * i;
        if (distancePossible > timeToDistance[1][index]) {
            waysToBeat++;
        }
    }
    return multiplies * waysToBeat;
}, 1);

console.log(partOneResult);

const [time, distance] = input
    .split("\n")
    .map((line) => parseInt(line.split(":")[1].trim().split(/\s+/).join("")));

let partTwoResult = 0;
for (let i = 0; i < time; i++) {
    const distancePossible = (time - i) * i;
    if (distancePossible > distance) {
        partTwoResult++;
    }
}

console.log(partTwoResult);
