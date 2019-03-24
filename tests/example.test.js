const assert = require("assert");

let value;

beforeEach(() => {
  value = 10;
});

test(`test1`, () => assert(10 === value, "The error message"));
