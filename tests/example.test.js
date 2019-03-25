let value;

beforeEach(() => {
  value = 10;
});

test(`test1`, ({ assert }) => assert.equal(value, 10));
test(`test2`, ({ assert }) => assert.equal(value, 10));
test(`test3`, ({ assert }) => assert.equal(value, 10));
