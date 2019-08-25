/* istanbul ignore file */
describe("describe 1", () => {
  it("test 1", testMock);

  describe("describe 2", () => {
    it("test 2", testMock);

    describe("describe 3", () => {
      it("test 3", testMock);
    });

    it("test 4", testMock);
  });
});
