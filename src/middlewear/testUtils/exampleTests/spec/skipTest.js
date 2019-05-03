beforeEach(global.beforeEachMock);
afterEach(global.afterEachMock);

test.skip(`test2`, global.testMock);

describe.skip("describe skips", () => {
  it("test3", global.testMock);

  describe("nested describe skips", () => {
    it("test4", global.testMock);
  });
});
