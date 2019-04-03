import compose from "./compose";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import { EventEmitter } from "events";

jest.mock("events");

describe("compose", () => {
  const setup: Setup = createSetup();

  const results: Results = [];

  let middlewearA;
  let middlewearB;
  let middlewears;
  let events: EventEmitter;

  beforeEach(() => {
    middlewearA = jest.fn();
    middlewearB = jest.fn();
    middlewears = [middlewearA, middlewearB];

    events = new EventEmitter();
  });

  it("should call each middlewear", () => {
    compose(...middlewears)(setup, results, events);

    expect(middlewearA).toBeCalledWith(setup, results, events);
    expect(middlewearB).toBeCalledWith(setup, results, events);
  });
});
