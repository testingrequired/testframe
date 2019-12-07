import event from "./event";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

describe("event", () => {
  const setup: Setup = createSetup();

  let callback: Function;

  beforeEach(() => {
    callback = jest.fn();
  });

  it("should callback on event", () => {
    event("test", callback)(setup);
    setup.events.emit("test");
    expect(callback).toBeCalled();
  });
});
