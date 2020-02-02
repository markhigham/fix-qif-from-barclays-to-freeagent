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
  //   output: process.stdout,
  console: false
});

readInterface.on("line", line => {
  if (line[0] == "T") {
    const transaction = line.substr(1);
    const val = Number(transaction) * -1;
    console.log(val);
    // console.log(`ORIGINAL=${transaction} FIXED=${val}`);
    return;
  }
  console.log(line);
});
