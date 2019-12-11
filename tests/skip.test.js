it.skip("skip single test");

describe.skip("skip block of test", () => {
  it.skip("test 1", () => {
    assert(false);
  });

  it.skip("test 2", () => {
    assert(false);
  });
});
