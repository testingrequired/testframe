beforeEach(global.beforeEachMock);

describe("nested", () => {
  beforeEach(global.beforeEachMock);

  test(`test`, global.testMock);

  describe("deeper", () => {
    beforeEach(global.beforeEachMock);
    test(`test`, global.testMock);
  });
});

test(`test`, global.testMock);
