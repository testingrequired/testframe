describe("async test", () => {
  it("should work", async () => {
    await sleep(1000);
    assert(true);
  });
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
