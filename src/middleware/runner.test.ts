import runner from "./runner";
import Setup from "../types/Setup";
import Test from "../types/Test";
import Results from "../types/Results";
import createTest from "./testUtils/createTest";
import createSetup from "./testUtils/createSetup";
import { AssertionError } from "assert";

jest.mock("events");

describe("runner", () => {
  let expectedTest: Test;
  let expectedTests;
  let setup: Setup;

  let results: Results;

  beforeEach(() => {
    expectedTest = createTest("1");
    expectedTests = [expectedTest];
    setup = createSetup(expectedTests);
    results = [];
    setup.assertionErrorsTypes.push(AssertionError);
  });

  describe("when run state is run", () => {
    it("should run test", () => {
      runner(setup)(results);
      expect(expectedTest.fn).toBeCalledWith();
    });

    it("should set test file path from", async () => {
      await runner(setup)(results);
      expect(results[0].testFilePath).toEqual(expectedTest.testFilePath);
    });

    it("should set description from test", async () => {
      await runner(setup)(results);
      expect(results[0].description).toEqual(expectedTest.description);
    });

    it("should set state to passed", async () => {
      await runner(setup)(results);
      expect(results[0].state).toEqual("passed");
    });

    it.todo("should set start date");

    it.todo("should set end date");

    describe("events", () => {
      it("should emit on test start for each test", () => {
        runner(setup)(results);
        expect(setup.events.emit).toBeCalledWith("test:start", expectedTest);
      });

      it("should emit on test result for each test", async () => {
        expectedTests.push(createTest("2"));
        await runner(setup)(results);
        expect(setup.events.emit).toBeCalledWith("test:result", results[0]);
        expect(setup.events.emit).toBeCalledWith("test:result", results[1]);
      });

      it("should emit results when complete", async () => {
        await runner(setup)(results);
        expect(setup.events.emit).toBeCalledWith("results", results);
      });

      describe("when test failure", () => {
        let error: Error;

        beforeEach(() => {
          error = new AssertionError({});

          (expectedTest.fn as any).mockImplementation(() => {
            throw error;
          });
        });

        it("should set state to failed", async () => {
          await runner(setup)(results);
          expect(results[0].state).toEqual("failed");
        });

        it("should emit test:failure", async () => {
          await runner(setup)(results);
          expect(setup.events.emit).toBeCalledWith("test:failure", results[0]);
        });
      });
    });

    describe("when test throws error", () => {
      let error: Error;

      beforeEach(() => {
        error = new Error();

        (expectedTest.fn as any).mockImplementation(() => {
          throw error;
        });
      });

      describe("when error is assertion error type", () => {
        beforeEach(() => {
          setup.assertionErrorsTypes.push(Error);
        });

        it("should set state to failed", async () => {
          await runner(setup)(results);
          expect(results[0].state).toEqual("failed");
        });

        it("should emit test:failure", async () => {
          await runner(setup)(results);
          expect(setup.events.emit).toBeCalledWith("test:failure", results[0]);
        });

        it("should set error to error thrown", async () => {
          await runner(setup)(results);
          expect(results[0].error).toEqual(error);
        });
      });

      describe("when error is not assertion error type", () => {
        it("should set state to errored", async () => {
          await runner(setup)(results);
          expect(results[0].state).toEqual("errored");
        });

        it("should emit test:error", async () => {
          await runner(setup)(results);
          expect(setup.events.emit).toBeCalledWith("test:error", results[0]);
        });

        it("should set error to error thrown", async () => {
          await runner(setup)(results);
          expect(results[0].error).toEqual(error);
        });
      });
    });

    describe("multiple tests", () => {
      const expectedTest2: Test = {
        testFilePath: "test file path 2",
        description: "description 2",
        runState: "run",
        fn: jest.fn()
      };

      const expectedTest3: Test = {
        testFilePath: "test file path 3",
        description: "description 3",
        runState: "run",
        fn: jest.fn()
      };

      beforeEach(() => {
        expectedTests.push(expectedTest2, expectedTest3);
      });

      it("should run all tests", async () => {
        await runner(setup)(results);
        expect(expectedTest.fn).toBeCalledWith();
        expect(expectedTest2.fn).toBeCalledWith();
        expect(expectedTest3.fn).toBeCalledWith();
      });
    });

    describe("async test", () => {
      describe("when test throws error", () => {
        let error: Error;

        beforeEach(() => {
          error = new Error();

          (expectedTest.fn as any).mockImplementation(async () => {
            throw error;
          });
        });

        describe("when error is assertion error type", () => {
          beforeEach(() => {
            setup.assertionErrorsTypes.push(Error);
          });

          it("should set state to failed", async () => {
            await runner(setup)(results);
            expect(results[0].state).toEqual("failed");
          });

          it("should emit test:failure", async () => {
            await runner(setup)(results);
            expect(setup.events.emit).toBeCalledWith(
              "test:failure",
              results[0]
            );
          });

          it("should set error to error thrown", async () => {
            await runner(setup)(results);
            expect(results[0].error).toEqual(error);
          });
        });

        describe("when error is not assertion error type", () => {
          it("should set state to errored", async () => {
            await runner(setup)(results);
            expect(results[0].state).toEqual("errored");
          });

          it("should emit test:error", async () => {
            await runner(setup)(results);
            expect(setup.events.emit).toBeCalledWith("test:error", results[0]);
          });

          it("should set error to error thrown", async () => {
            await runner(setup)(results);
            expect(results[0].error).toEqual(error);
          });
        });
      });
    });
  });

  describe("when run state is skip", () => {
    beforeEach(() => {
      expectedTest.runState = "skip";
    });

    it("should set state to skipped", async () => {
      await runner(setup)(results);
      expect(results[0].state).toEqual("skipped");
    });

    it("should not call test function 2", () => {
      runner(setup)(results);
      expect(expectedTest.fn).not.toBeCalled();
    });
  });

  describe("when run state is todo", () => {
    beforeEach(() => {
      expectedTest.runState = "todo";
    });

    it("should set state to todo", async () => {
      await runner(setup)(results);
      expect(results[0].state).toEqual("todo");
    });

    it("should not call test function", () => {
      runner(setup)(results);
      expect(expectedTest.fn).not.toBeCalled();
    });
  });

  describe("when run state is unknown", () => {
    beforeEach(() => {
      (expectedTest.runState as any) = "unknown";
    });

    it("should throw error", () => {
      expect(runner(setup)(results)).rejects.toEqual(
        "Invalid test run state: unknown"
      );
    });
  });
});
