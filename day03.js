const readFrom = require("./read-input");

const args = process.argv;
const input = readFrom(args);
if (!input) return;

let partOneResult = 0;
const lines = input.split("\n");

const checkHorizontal = (line, start, end) => {
    const before = line[start - 1];
    const after = line[end];

    if (parseInt(before)) console.log(before);
    if (parseInt(after)) console.log(after);

    if ((before && before !== ".") || (after && after !== ".")) {
        return true;
    }

    return false;
};

const checkVertical = (lineI, start, end) => {
    for (let i = start - 1; i <= end; i++) {
        if (0 <= lineI - 1 && 0 <= i && i < lines[lineI].length) {
            if (lines[lineI - 1][i] !== "." && !parseInt(lines[lineI - 1][i])) {
                return true;
            }
        }

        if (lineI + 1 < lines.length && 0 <= i && i < lines[lineI].length) {
            if (lines[lineI + 1][i] !== "." && !parseInt(lines[lineI + 1][i]))
                return true;
        }
    }
};

lines.forEach((line, i) => {
    const numbers = line.matchAll(/\d+/g);

    for (const number of numbers) {
        if (
            checkHorizontal(line, number.index, number.index + number[0].length) ||
            checkVertical(i, number.index, number.index + number[0].length)
        ) {
            partOneResult += parseInt(number[0]);
        }
    }
});

console.log(partOneResult);

let partTwoResult = 0;

const getHorizontals = (lineI, gearI) => {
    const range = [gearI - 1, gearI, gearI + 1];

    const numbers = lines[lineI].matchAll(/\d+/g);

    let res = [];
    for (const number of numbers) {
        const start = number.index;
        const end = number.index + number[0].length;
        for (let i = start; i < end; i++) {
            if (range.includes(i)) {
                res.push(parseInt(number[0]));
                break;
            }
        }
    }
    return res;
};

const getVerticals = (lineI, gearI) => {
    const numbers = lines[lineI].matchAll(/\d+/g);

    let res = [];
    for (const number of numbers) {
        const start = number.index;
        const end = number.index + number[0].length;
        if (start === gearI + 1 || end === gearI) res.push(parseInt(number[0]));
    }
    return res;
};

lines.forEach((line, i) => {
    const gearSymbols = line.matchAll(/\*/g);

    for (const gear of gearSymbols) {
        const top = 0 < i ? getHorizontals(i - 1, gear.index) : [];
        const adj = getVerticals(i, gear.index);
        const under = i < lines.length - 1 ? getHorizontals(i + 1, gear.index) : [];
        const adjs = top.concat(adj).concat(under);
        if (adjs.length === 2) {
            partTwoResult += adjs[0] * adjs[1];
        }
    }
});

console.log(partTwoResult);
