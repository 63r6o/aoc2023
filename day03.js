const readFrom = require("./read-input");

const args = process.argv;
const input = readFrom(args);
if (!input) return;

const lines = input.split("\n");

const checkVertical = (lineI, start, end) => {
    const symbols = lines[lineI].matchAll(/[^0-9|.]/g);

    for (const symbol of symbols) {
        if (start <= symbol.index && symbol.index <= end) return true;
    }

    return false;
};

const partOneResult = lines.reduce((sum, line, i) => {
    const numbers = line.matchAll(/\d+/g);

    let lineSum = 0;
    for (const number of numbers) {
        const start = number.index - 1;
        const end = number.index + number[0].length;

        if (
            (0 < i && checkVertical(i - 1, start, end)) ||
            (i < lines.length - 1 && checkVertical(i + 1, start, end)) ||
            (line[start] && line[start] !== ".") ||
            (line[end] && line[end] !== ".")
        ) {
            lineSum += parseInt(number[0]);
        }
    }

    return sum + lineSum;
}, 0);

console.log(partOneResult);

const getVerticals = (lineI, gearI) => {
    const numbers = lines[lineI].matchAll(/\d+/g);

    let verticals = [];
    for (const number of numbers) {
        const start = number.index - 1;
        const end = number.index + number[0].length;

        if (start <= gearI && gearI <= end) verticals.push(parseInt(number[0]));
    }

    return verticals;
};

const getHorizontals = (lineI, gearI) => {
    const numbers = lines[lineI].matchAll(/\d+/g);

    let horizontals = [];
    for (const number of numbers) {
        const start = number.index - 1;
        const end = number.index + number[0].length;

        if (start === gearI || end === gearI) horizontals.push(parseInt(number[0]));
    }

    return horizontals;
};

const partTwoResult = lines.reduce((sum, line, i) => {
    const gears = line.matchAll(/\*/g);

    let lineSum = 0;
    for (const gear of gears) {
        const top = 0 < i ? getVerticals(i - 1, gear.index) : [];
        const bottom = i < line.length - 1 ? getVerticals(i + 1, gear.index) : [];
        const horizontals = getHorizontals(i, gear.index);

        const adjecents = top.concat(bottom).concat(horizontals);

        if (adjecents.length === 2) lineSum += adjecents.reduce((a, b) => a * b);
    }

    return sum + lineSum;
}, 0);

console.log(partTwoResult);
