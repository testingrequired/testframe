import event from "./event";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import { EventEmitter } from "events";

describe("event", () => {
  const setup: Setup = createSetup();

  const results: Results = [];

  let events: EventEmitter;
  let callback;

  beforeEach(() => {
    events = new EventEmitter();
    callback = jest.fn();
  });

  it("should callback on event", () => {
    event("test", callback)(setup, results, events);
    events.emit("test");
    expect(callback).toBeCalled();
  });
});
