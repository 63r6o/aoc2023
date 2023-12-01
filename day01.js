const readFrom = require("./read-input");

const args = process.argv;
const input = readFrom(args);
if (!input) return;

const partOneResult = input.split("\n").reduce((sum, line) => {
    const chars = line.split("");
    const firstDigit = chars.find((c) => parseInt(c));
    const secondDigit = chars.reverse().find((c) => parseInt(c));

    return (sum += Number.parseInt(firstDigit + secondDigit) || 0);
}, 0);

console.log(partOneResult);

// Say no to regex!
const digits = [
    ["one", "1"],
    ["two", "2"],
    ["three", "3"],
    ["four", "4"],
    ["five", "5"],
    ["six", "6"],
    ["seven", "7"],
    ["eight", "8"],
    ["nine", "9"],
];

const partTwoResult = input.split("\n").reduce((sum, line) => {
    let [minIndex, firstDigit] = [line.length, -1];
    let [maxIndex, secondDigit] = [-1, -1];

    digits.forEach(([spelled, num], i) => {
        const startOfSpelled = line.indexOf(spelled);
        const startOfNum = line.indexOf(num);

        if (startOfSpelled !== -1 && startOfSpelled < minIndex) {
            [minIndex, firstDigit] = [startOfSpelled, i + 1];
        }

        if (startOfNum !== -1 && startOfNum < minIndex) {
            [minIndex, firstDigit] = [startOfNum, i + 1];
        }

        const endOfSpelled = line.lastIndexOf(spelled);
        const endOfNum = line.lastIndexOf(num);

        if (endOfSpelled > maxIndex) {
            [maxIndex, secondDigit] = [endOfSpelled, i + 1];
        }

        if (endOfNum > maxIndex) {
            [maxIndex, secondDigit] = [endOfNum, i + 1];
        }
    });

    return (sum += Number.parseInt(`${firstDigit}${secondDigit}`) || 0);
}, 0);

console.log(partTwoResult);
