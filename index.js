#!/usr/bin/env node
"use strict";
const fs = require("fs");
const readline = require("readline");
const argv = require("minimist")(process.argv.slice(2));

const app = process.argv[0];

const USAGE = `
 Usage: ${app} path_to_quicken
`;

let usageFail = false;
if (!argv._.length) {
  usageFail = true;
}

const filename = argv._[0];

if (!fs.existsSync(filename)) {
  usageFail = true;
}

if (usageFail) {
  console.error(USAGE);
  process.exit(-1);
}

const readInterface = readline.createInterface({
  input: fs.createReadStream(filename),
  console: false
});

readInterface.on("line", line => {
  //Inline exceptions
  if (line == '"PNPM, INC."') {
    //because FreeAgent doesn't like the quotes
    console.log("PNPM Inc");
    return;
  }

  if (line[0] == "T") {
    const transaction = line.substr(1);
    const val = Number(transaction) * -1;
    console.log(`T${val}`);
    return;
  }
  console.log(line);
});
