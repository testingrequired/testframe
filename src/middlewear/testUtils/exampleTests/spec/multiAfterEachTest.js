/* istanbul ignore file */
describe("describe 1", () => {
  afterEach(afterEachMock);

  it("test 1", testMock);

  describe("describe 2", () => {
    afterEach(afterEachMock);

    afterEach(afterEachMock);

    it("test 2", testMock);
  });

  it("test 3", testMock);
});
