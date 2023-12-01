const fs = require("fs");

const usage = "node day[xx] path/to/input/file";

const readFrom = (args) => {
  if (args.length < 3) {
    console.log("Not enough arguments!");
    console.log(`Usage: ${usage}`);
    return null;
  }

  if (args.length > 3) {
    console.log("Too many arguments!");
    console.log(`Usage: ${usage}`);
    return null;
  }

  if (!fs.existsSync(args[2])) {
    console.log("The input file doesn't exists!");
    return null;
  }

  return fs.readFileSync(args[2], "utf8").trim();
};

module.exports = readFrom;
