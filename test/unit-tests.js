const assert = require("chai").assert;
const QifProcessor = require("../lib/qif-processor");

describe("unit tests", () => {
  let qif;
  before(() => {
    qif = new QifProcessor();
  });

  it("should create a valid processor", () => {
    const qif = new QifProcessor();
    assert.isNotNull(qif);
  });

  it("should change the sign for T records", () => {
    const trn = `T1000`;
    const output = qif.processLine(trn);
    assert.equal(output, "T-1000");
  });

  it("should fix npm values", () => {
    const trn = '"PNPM, INC."';
    const output = qif.processLine(trn);
    assert.equal(output, "PNPM Inc");
  });

  it("should ignore everything else", () => {
    const trn = "ABCDEF";
    const output = qif.processLine(trn);
    assert.equal(output, trn);
  });
});
