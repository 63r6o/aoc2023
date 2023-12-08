const readFrom = require("./read-input");

const args = process.argv;
const input = readFrom(args);
if (!input) return;

const graph = new Map();
const instructions = input.split("\n\n")[0].split("");

const nodes = input
    .split("\n\n")[1]
    .split("\n")
    .map((line) => {
        const [node, children] = line.split(" = ");
        const [leftChild, rightChild] = children.replace(/\(|\)|,/g, "").split(" ");

        return [node, [leftChild, rightChild]];
    });

nodes.forEach(([node, [leftChild, rightChild]]) => {
    graph.set(node, { L: leftChild, R: rightChild });
});

const traverse = (node, endings) => {
    let steps = 0;
    let instructionIndex = 0;
    let curr = node;

    while (!endings.includes(curr)) {
        if (instructionIndex === instructions.length) instructionIndex = 0;

        curr = graph.get(curr)[instructions[instructionIndex]];
        instructionIndex += 1;
        steps += 1;
    }
    return steps;
};

const partOneResult = traverse(nodes[0][0], ["ZZZ"]);
console.log(partOneResult);

const starterNodes = nodes.map((n) => n[0]).filter((n) => n.endsWith("A"));
const endingNodes = nodes.map((n) => n[0]).filter((n) => n.endsWith("Z"));

const leastCommonMultiple = (nums) => {
    const gcd = (a, b) => (!b ? a : gcd(b, a % b));
    const lcm = (a, b) => (a * b) / gcd(a, b);

    return nums.reduce((multiple, num) => lcm(multiple, num), Math.min(...nums));
};

const endingSteps = starterNodes.map((n) => traverse(n, endingNodes));
const partTwoResult = leastCommonMultiple(endingSteps);

console.log(partTwoResult);
