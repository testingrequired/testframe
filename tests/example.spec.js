describe("counter", () => {
  let value;

  beforeEach(() => {
    value = 1;
  });

  describe("increment", () => {
    beforeEach(() => {
      value++;
    });

    it("should have incremented", () => {
      assert(value === 2);
    });
  });
});
