#!/usr/bin/env node
"use strict";
const fs = require("fs");
const readline = require("readline");
const argv = require("minimist")(process.argv.slice(2));

const QifProcessor = require("./lib/qif-processor");

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

const qif = new QifProcessor();

const readInterface = readline.createInterface({
  input: fs.createReadStream(filename),
  console: false
});

readInterface.on("line", line => {
  const output = qif.processLine(line);
  console.log(output);
});
