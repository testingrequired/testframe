describe("async", () => {
  const expectedValue = Symbol("expected value");
  let beforeEachValue;
  let testValue;

  beforeEach(async () => {
    beforeEachValue = await asyncGetValue(expectedValue);
  });

  it("should work for before each", async () => {
    assert(Object.is(beforeEachValue, expectedValue));
  });

  it("should work for test", async () => {
    testValue = await asyncGetValue(expectedValue);
    assert(Object.is(testValue, expectedValue));
  });
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncGetValue(input, delay = 1) {
  await sleep(delay);
  return input;
}
