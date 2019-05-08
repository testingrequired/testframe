aroundEach(function*() {
  beforeEachMock();
  yield;
  afterEachMock();
});

test("test1", testMock);
