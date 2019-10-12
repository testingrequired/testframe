import compose from "./compose";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import { EventEmitter } from "events";

jest.mock("events");

describe("compose", () => {
  const setup: Setup = createSetup();

  const results: Results = [];

  let middlewareA;
  let middlewareAResultsExecutor;
  let middlewareB;
  let middlewareBResultsExecutor;
  let middlewares;
  let events: EventEmitter;

  beforeEach(() => {
    middlewareAResultsExecutor = jest.fn();
    middlewareA = jest.fn(() => middlewareAResultsExecutor);
    middlewareBResultsExecutor = jest.fn();
    middlewareB = jest.fn(() => middlewareBResultsExecutor);
    middlewares = [middlewareA, middlewareB];

    events = new EventEmitter();
  });

  it("should call each middleware and results executor", () => {
    compose(...middlewares)(setup, events)(results);

    expect(middlewareA).toBeCalledWith(setup, events);
    expect(middlewareAResultsExecutor).toBeCalledWith(results);
    expect(middlewareB).toBeCalledWith(setup, events);
    expect(middlewareBResultsExecutor).toBeCalledWith(results);
  });
});
