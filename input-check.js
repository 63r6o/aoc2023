const fs = require("fs");

const usage = "node day[xx] path/to/input/file";

const validate = (args) => {
    if (args.length < 3) {
        console.log("Not enough arguments!");
        console.log(`Usage: ${usage}`);
        return false;
    }

    if (args.length > 3) {
        console.log("Too many arguments!");
        console.log(`Usage: ${usage}`);
        return false;
    }

    if (!fs.existsSync(args[2])) {
        console.log("The input file doesn't exists!");
        return false;
    }

    return args[2];
};

module.exports = validate;
