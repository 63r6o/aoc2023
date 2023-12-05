const readFrom = require("./read-input");

const args = process.argv;
const input = readFrom(args);
if (!input) return;

const parts = input.split("\n\n");

const seeds = parts
    .shift()
    .split(": ")[1]
    .split(" ")
    .map((s) => parseInt(s));

const locations = parts.reduce((destinations, mapLine) => {
    const maps = mapLine
        .split(":\n")[1]
        .split("\n")
        .map((line) => line.split(" ").map((m) => parseInt(m)));

    return destinations.map((seed) => {
        for (const map of maps) {
            if (map[1] <= seed && seed <= map[1] + map[2] - 1) {
                return map[0] + (seed - map[1]);
            }
        }
        return seed;
    });
}, seeds);

const partOneResult = Math.min(...locations);

console.log(partOneResult);

// don't judge
const partTwoSeeds = [];
for (let i = 0; i < seeds.length; i += 2) {
    partTwoSeeds.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
}

const getUnder = (seedRange, mapRange) => {
    if (seedRange[1] < mapRange[0]) return seedRange;
    if (mapRange[0] <= seedRange[0]) return null;

    return [seedRange[0], Math.min(seedRange[1], mapRange[0] - 1)];
};

const getOver = (seedRange, mapRange) => {
    if (mapRange[1] < seedRange[0]) return seedRange;
    if (seedRange[1] <= mapRange[1]) return null;

    return [Math.max(seedRange[0], mapRange[1] + 1), seedRange[1]];
};

const getOverlap = (seedRange, mapRange) => {
    if (seedRange[1] < mapRange[0]) return null;
    if (mapRange[1] < seedRange[0]) return null;

    return [
        mapRange[0] <= seedRange[0] ? seedRange[0] : mapRange[0],
        mapRange[1] <= seedRange[1] ? mapRange[1] : seedRange[1],
    ];
};

const locationRanges = parts.reduce((destinations, mapLine, i) => {
    const maps = mapLine
        .split(":\n")[1]
        .split("\n")
        .map((line) => line.split(" ").map((m) => parseInt(m)));

    const newDestinations = [];

    for (const seedRange of destinations) {
        const overlapped = new Set();

        for (const map of maps) {
            const destStart = map[0];
            const mapRange = [map[1], map[1] + map[2] - 1];

            const overlap = getOverlap(seedRange, mapRange);
            if (overlap) {
                overlapped.add(seedRange.toString());

                const under = getUnder(seedRange, mapRange);
                const over = getOver(seedRange, mapRange);

                if (under) destinations.push(under);
                if (over) destinations.push(over);

                newDestinations.push([
                    destStart + (overlap[0] - mapRange[0]),
                    destStart + (overlap[1] - mapRange[0]),
                ]);
            }
        }

        if (!overlapped.has(seedRange.toString())) {
            newDestinations.push(seedRange);
        }
    }
    return newDestinations;
}, partTwoSeeds);

let partTwoResult = Infinity;

for (const range of locationRanges) {
    partTwoResult = range[0] < partTwoResult ? range[0] : partTwoResult;
}

console.log(partTwoResult);
