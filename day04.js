const readFrom = require("./read-input");

const args = process.argv;
const input = readFrom(args);
if (!input) return;

const lines = input.split("\n");

const partOneResult = lines.reduce((sum, line) => {
    const [winningRaw, numbersRaw] = line.split(" | ");
    const winningNumbers = winningRaw
        .split(": ")[1]
        .split(" ")
        .filter((n) => n !== "");

    const points = numbersRaw.split(" ").reduce((points, number) => {
        if (winningNumbers.includes(number)) {
            return points > 0 ? points + points : 1;
        }

        return points;
    }, 0);

    return sum + points;
}, 0);

console.log(partOneResult);

const partTwoResult = lines
    .reduce(
        (copies, line, lineI) => {
            const [winningRaw, numbersRaw] = line.split(" | ");
            const winningNumbers = winningRaw
                .split(": ")[1]
                .split(" ")
                .filter((n) => n !== "");

            const points = numbersRaw.split(" ").reduce((points, number) => {
                if (winningNumbers.includes(number)) {
                    return points + 1;
                }

                return points;
            }, 0);

            for (let i = 0; i < points; i++) {
                copies[lineI + i + 1] += copies[lineI];
            }

            return copies;
        },
        [...Array(lines.length)].map((_) => 1)
    )
    .reduce((sum, copy) => sum + copy);

console.log(partTwoResult);
