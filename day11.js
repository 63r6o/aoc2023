const readFrom = require("./read-input");

const args = process.argv;
const input = readFrom(args);
if (!input) return;

const map = input.split("\n").map((line) => line.split(""));
const expandableRow = Array(map.length).fill(true);
const expandableCol = Array(map[0].length).fill(true);
const galaxyCords = [];

map.forEach((line, i) =>
    line.forEach((s, j) => {
        if (s === "#") {
            galaxyCords.push([i, j]);
            expandableRow[i] = false;
            expandableCol[j] = false;
        }
    })
);

const getResultTest = (expandSize) => {
    let result = 0;

    for (let i = 0; i < galaxyCords.length; i++) {
        for (let j = i + 1; j < galaxyCords.length; j++) {
            const [startRow, startCol] = galaxyCords[i];
            const [destRow, destCol] = galaxyCords[j];

            let expandedRows = 0;
            for (let k = startRow; k < destRow; k++) {
                expandedRows += expandableRow[k] ? expandSize - 1 : 0;
            }

            let expandedCols = 0;
            for (
                let k = Math.min(startCol, destCol);
                k < Math.max(startCol, destCol);
                k++
            ) {
                expandedCols += expandableCol[k] ? expandSize - 1 : 0;
            }

            result +=
                Math.abs(startRow - destRow) +
                Math.abs(startCol - destCol) +
                expandedCols +
                expandedRows;
        }
    }
    return result;
};

const partOneResult = getResultTest(2);
console.log(partOneResult);

const partTwoResult = getResultTest(1000000);
console.log(partTwoResult);
