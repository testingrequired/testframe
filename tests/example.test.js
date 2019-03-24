let value;

beforeEach(() => {
  value = 10;
});

test(`test1`, assert => assert(10 === value, "The error message"));
test(`test2`, (assert, { testValue }) => assert.equal(testValue, 100));
