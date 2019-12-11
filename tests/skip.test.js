it.skip("skip single test");

describe.skip("skip block of test", () => {
  it("test 1", () => {
    assert(false);
  });

  it("test 2", () => {
    assert(false);
  });

  describe("nested also works", () => {
    it("test 3", () => {
      assert(false);
    });
  });
});
