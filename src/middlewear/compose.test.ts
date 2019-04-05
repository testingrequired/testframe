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
  let middlewearAResultsExecutor;
  let middlewearB;
  let middlewearBResultsExecutor;
  let middlewears;
  let events: EventEmitter;

  beforeEach(() => {
    middlewearAResultsExecutor = jest.fn();
    middlewearA = jest.fn(() => middlewearAResultsExecutor);
    middlewearBResultsExecutor = jest.fn();
    middlewearB = jest.fn(() => middlewearBResultsExecutor);
    middlewears = [middlewearA, middlewearB];

    events = new EventEmitter();
  });

  it("should call each middlewear and results executor", () => {
    compose(...middlewears)(setup, events)(results);

    expect(middlewearA).toBeCalledWith(setup, events);
    expect(middlewearAResultsExecutor).toBeCalledWith(results);
    expect(middlewearB).toBeCalledWith(setup, events);
    expect(middlewearBResultsExecutor).toBeCalledWith(results);
  });
});
