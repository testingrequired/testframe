beforeEach(global.beforeEachMock);
afterEach(global.afterEachMock);

describe("nested", () => {
  beforeEach(global.beforeEachMock);
  afterEach(global.afterEachMock);

  test(`test`, global.testMock);

  describe("deeper", () => {
    beforeEach(global.beforeEachMock);
    afterEach(global.afterEachMock);

    test(`test`, global.testMock);
  });
});

test(`test`, global.testMock);
