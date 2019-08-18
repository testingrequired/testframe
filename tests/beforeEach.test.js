describe("beforeEach", () => {
  let value;

  beforeEach(() => {
    value = 0;
  });

  it("should initialize value", () => {
    assert.strictEqual(value, 0);
  });

  describe("increment", () => {
    beforeEach(() => {
      value += 1;
    });

    it("should increment value", () => {
      assert.strictEqual(value, 1);
    });
  });

  describe("decrement", () => {
    beforeEach(() => {
      value -= 1;
    });

    it("should decrement value", () => {
      assert.strictEqual(value, -1);
    });
  });
});
