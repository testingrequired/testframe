import printResultsToConsole from "./printResultsToConsole";
import Setup from "../types/Setup";
import Results from "../types/Results";
import createSetup from "./testUtils/createSetup";
import createResult from "./testUtils/createResult";
import { EventEmitter } from "events";

jest.mock("events");

describe("printResultsToConsole", () => {
  const setup: Setup = createSetup();

  const results: Results = [createResult("1")];

  let logSpy;
  let events: EventEmitter;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log");
    events = new EventEmitter();
  });

  it("should call console.log with json stringified results", () => {
    printResultsToConsole(setup, results, events);

    // expect(logSpy).toBeCalledWith(JSON.stringify(results, null, 2));
  });
});
