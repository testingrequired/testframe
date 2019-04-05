import printResultsToConsole from "./printResultsToConsole";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";
import createResult from "./testUtils/createResult";
import { EventEmitter } from "events";
import Result from "../types/Result";

describe("printResultsToConsole", () => {
  const setup: Setup = createSetup();
  const result: Result = createResult("1");

  let logSpy;
  let events: EventEmitter;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    events = new EventEmitter();
  });

  it("should call console.log with json stringified results", () => {
    printResultsToConsole(setup, events);

    events.emit("test:result", result);

    expect(logSpy).toBeCalledWith(JSON.stringify(result, null, 2));
  });
});
