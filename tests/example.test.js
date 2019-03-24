let value;

beforeEach(() => {
  value = 10;
});

test(`test1`, assert => assert(11 === value, "The error message"));
