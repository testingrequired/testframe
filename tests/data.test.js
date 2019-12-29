it("should define data fixture", () => {
  assert(typeof fixtures.data !== "undefined");
});

describe("data.json", () => {
  const path = "tests/data/data.json";
  let dataJson;

  beforeEach(async () => {
    dataJson = await (await fixtures.data)[path];
    debugger;
  });

  it("should define data entry", () => {
    assert(typeof dataJson !== "undefined");
  });

  it("should equal expected data value", () => {
    assert.strictEqual(JSON.stringify(dataJson), JSON.stringify([1, 2, 3]));
  });
});
