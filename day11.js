const readFrom = require("./read-input");

const args = process.argv;
const input = readFrom(args);
if (!input) return;

const expandMapBy = (size, numberOfGalaxies = 1) => {
    const wideGalaxyMap = input.split("\n").map((line) => {
        const mapped = line
            .split("")
            .map((s) =>
                s === "#"
                    ? { galaxy: true, size: 1, number: numberOfGalaxies++ }
                    : { galaxy: false, size: 1 }
            );

        return mapped.every((s) => !s.galaxy)
            ? mapped.map((s) => (s.galaxy ? s : { ...s, size: s.size + size - 1 })) // 1000000
            : mapped;
    });

    for (let i = 0; i < wideGalaxyMap[0].length; i++) {
        let needsToExpand = true;
        for (let j = 0; j < wideGalaxyMap.length; j++) {
            // console.log(wideGalaxyMap[j][i]);
            if (wideGalaxyMap[j][i].galaxy) {
                needsToExpand = false;
                continue;
            }
        }

        if (!needsToExpand) continue;

        for (let j = 0; j < wideGalaxyMap.length; j++) {
            wideGalaxyMap[j][i].size += size - 1;
        }
    }

    return wideGalaxyMap;
};

const getGalaxyCoordinatesFrom = (map) => {
    const galaxyCoordinates = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j].galaxy) galaxyCoordinates.push([i, j]);
        }
    }

    return galaxyCoordinates;
};

const partOneMap = expandMapBy(2);
const partTwoMap = expandMapBy(1000000);

const galaxyCoordinates = getGalaxyCoordinatesFrom(partOneMap);
const getResult = (map) =>
    galaxyCoordinates.reduce((res, startGalaxy, i) => {
        return (
            res +
            galaxyCoordinates.slice(i).reduce((stepSums, endGalaxy) => {
                const smallerRow =
                    startGalaxy[0] < endGalaxy[0] ? startGalaxy : endGalaxy;
                const biggerRow =
                    startGalaxy[0] < endGalaxy[0] ? endGalaxy : startGalaxy;

                const smallerCol =
                    startGalaxy[1] < endGalaxy[1] ? startGalaxy : endGalaxy;
                const biggerCol =
                    startGalaxy[1] < endGalaxy[1] ? endGalaxy : startGalaxy;

                let stepSum = 0;
                for (let i = smallerCol[1]; i < biggerCol[1]; i++) {
                    stepSum += map[smallerCol[0]][i].size;
                }

                for (let i = smallerRow[0]; i <= biggerRow[0] - 1; i++) {
                    stepSum += map[i][biggerRow[1]].size;
                }

                return stepSums + stepSum;
            }, 0)
        );
    }, 0);

const partOneResult = getResult(partOneMap);
console.log(partOneResult);

const partTwoResult = getResult(partTwoMap);
console.log(partTwoResult);
