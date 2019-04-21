describe("counter", () => {
  let value;

  beforeEach(() => {
    value = 1;
  });

  describe("increment", () => {
    beforeEach(() => {
      value++;
    });

    it.skip("should have incremented", () => {
      assert(value === 2);
    });
  });
});
