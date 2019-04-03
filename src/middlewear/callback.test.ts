import callback from "./callback";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import { EventEmitter } from "events";

jest.mock("events");

describe("callback", () => {
  let fn;

  const setup: Setup = createSetup();

  const results: Results = [];

  let events: EventEmitter;

  beforeEach(() => {
    fn = jest.fn();
    events = new EventEmitter();
  });

  it("should call fn with setup and results", () => {
    callback(fn)(setup, results, events);
    expect(fn).toBeCalledWith(setup, results, events);
  });
});
