"use strict";

function QifProcessor() {
  const self = {};

  self.processLine = function(line) {
    if (!line) return line;

    if (line == '"PNPM, INC."') {
      //because FreeAgent doesn't like the quotes
      return "PNPM Inc";
    }

    if (line[0] == "T") {
      const transaction = line.substr(1);
      const val = Number(transaction) * -1;

      return `T${val}`;
    }

    return line;
  };

  return Object.freeze(self);
}

module.exports = QifProcessor;
