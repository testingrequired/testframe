let value;

beforeEach(() => {
  value = 10;
});

describe("testing", () => {
  beforeEach(() => {
    value++;
  });

  test(`test1`, () => assert.equal(value, 11));
});
