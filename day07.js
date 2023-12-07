const readFrom = require("./read-input");

const args = process.argv;
const input = readFrom(args);
if (!input) return;

const labels = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
];

const labelsWithJoker = [
    "A",
    "K",
    "Q",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "J",
];

const getTypeStrength = (hand, withJoker) => {
    const cards = new Map();

    const jokers = hand.reduce((js, c) => {
        if (!withJoker || c !== "J") {
            cards.set(c, (cards.get(c) || 0) + 1);
        }
        return withJoker && c === "J" ? js + 1 : js;
    }, 0);

    const [maxLabel, _maxOcc] = [...cards.entries()].reduce(
        (max, card) => {
            return card[1] > max[1] ? card : max;
        },
        [null, null]
    );
    cards.set(maxLabel, cards.get(maxLabel) + jokers);

    if (cards.size === 1) return 7;
    if (cards.size === 2) {
        for (const [_label, occurences] of cards) {
            if (occurences === 1 || occurences === 4) return 6;
            if (occurences === 2 || occurences === 3) return 5;
        }
    }
    if (cards.size === 3) {
        for (const [_label, occurences] of cards) {
            if (occurences === 3) return 4;
            if (occurences === 2) return 3;
        }
    }
    if (cards.size === 4) return 2;
    return 1;
};

const sortHands = (a, b, withJoker) => {
    const handA = a.split(" ")[0].split("");
    const handB = b.split(" ")[0].split("");

    const typeDiff =
        getTypeStrength(handB, withJoker) - getTypeStrength(handA, withJoker);

    if (typeDiff === 0) {
        for (let i = 0; i < handA.length; i++) {
            const aIndex = withJoker
                ? labelsWithJoker.indexOf(handA[i])
                : labels.indexOf(handA[i]);
            const bIndex = withJoker
                ? labelsWithJoker.indexOf(handB[i])
                : labels.indexOf(handB[i]);

            if (aIndex < bIndex) return -1;
            if (aIndex > bIndex) return 1;
        }
    }

    return typeDiff;
};

const partOneResult = input
    .split("\n")
    .sort((a, b) => sortHands(a, b, false))
    .reverse()
    .reduce((sum, line, i) => {
        const bid = parseInt(line.split(" ")[1]);

        return sum + bid * (i + 1);
    }, 0);

console.log(partOneResult);

const partTwoResult = input
    .split("\n")
    .sort((a, b) => sortHands(a, b, true))
    .reverse()
    .reduce((sum, line, i) => {
        const bid = parseInt(line.split(" ")[1]);

        return sum + bid * (i + 1);
    }, 0);

console.log(partTwoResult);
