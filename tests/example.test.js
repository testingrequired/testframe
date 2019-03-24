let value;

beforeAll(() => {
  console.log("Before All");
});

beforeEach(() => {
  value = 10;
});

afterEach(() => {
  console.log("After Each");
});

afterAll(() => {
  console.log("After All");
});

test(`test1`, assert => assert(10 === value, "The error message"));
test(`test2`, (assert, { testValue }) => assert.equal(testValue, 100));
