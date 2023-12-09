const readFrom = require("./read-input");

const args = process.argv;
const input = readFrom(args);
if (!input) return;

const [partOneResult, partTwoResult] = input.split("\n").reduce(
    ([future, past], reportLine) => {
        const report = reportLine.split(" ").map((v) => parseInt(v));

        const getDifferences = (report) => {
            return report.slice(1).reduce((diffs, value, i) => {
                return diffs.concat(value - report[i]);
            }, []);
        };

        const firstItems = [];
        const lastItems = [];
        let currentDiffs = report;
        while (!getDifferences(currentDiffs).every((v) => v === 0)) {
            currentDiffs = getDifferences(currentDiffs);
            firstItems.push(currentDiffs[0]);
            lastItems.push(currentDiffs[currentDiffs.length - 1]);
        }

        const newFuture =
            future +
            lastItems.reduce((sum, val) => sum + val) +
            report[report.length - 1];

        const newPast =
            past + report[0] - firstItems.reduceRight((sum, val) => val - sum, 0);

        return [newFuture, newPast];
    },
    [0, 0]
);

console.log(partOneResult);
console.log(partTwoResult);
