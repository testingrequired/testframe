import specSyntax from "./specSyntax";
import Setup from "../types/Setup";
import createSetup from "./testUtils/createSetup";

function runSetupTests(setup: Setup) {
  setup.tests.forEach(test => test.fn());
}

const expectedTestPath = "./src/middlewear/testUtils/exampleTests/spec/test.js";
const mockTestPath = "./testUtils/exampleTests/spec/test.js";

describe("loadTests", () => {
  let setup: Setup;
  let beforeEachMockFn;
  let afterEachMockFn;
  let testMockFn;

  beforeEach(() => {
    beforeEachMockFn = jest.fn();
    (global as any).beforeEachMock = beforeEachMockFn;

    afterEachMockFn = jest.fn();
    (global as any).afterEachMock = afterEachMockFn;

    testMockFn = jest.fn();
    (global as any).testMock = testMockFn;

    setup = createSetup();

    setup.testFilePaths = [expectedTestPath];
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe("beforeEach", () => {
    describe("when defined at top level", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          beforeEach(beforeEachMockFn);

          it("", testMockFn);
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should call before each hook once", () => {
        expect(beforeEachMockFn).toBeCalledTimes(1);
      });
    });

    describe("when no tests defined", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          describe("", () => {
            beforeEach(beforeEachMockFn);
          });
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should call before each hook zero times", () => {
        expect(beforeEachMockFn).toBeCalledTimes(0);
      });
    });

    describe("when defined after test", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          it("", testMockFn);

          beforeEach(beforeEachMockFn);
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should not run before each hook for test", () => {
        expect(beforeEachMockFn).toBeCalledTimes(0);
      });
    });

    describe("when defined in a describe", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          describe("", () => {
            beforeEach(beforeEachMockFn);

            it("", testMockFn);
          });
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should call before each hook once", () => {
        expect(beforeEachMockFn).toBeCalledTimes(1);
      });
    });

    describe("when defined multiple times as same level", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          describe("", () => {
            beforeEach(beforeEachMockFn);
            beforeEach(beforeEachMockFn);

            it("", testMockFn);
          });
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should call before each hook twice", () => {
        expect(beforeEachMockFn).toBeCalledTimes(2);
      });
    });

    describe("when defined at multiple levels", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          describe("", () => {
            beforeEach(beforeEachMockFn);

            describe("", () => {
              beforeEach(beforeEachMockFn);

              it("", testMockFn);
            });
          });
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should call before each hook twice", () => {
        expect(beforeEachMockFn).toBeCalledTimes(2);
      });
    });

    describe("when defined at multiple levels with multiple tests", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          describe("", () => {
            beforeEach(beforeEachMockFn);

            it("", testMockFn);

            describe("", () => {
              beforeEach(beforeEachMockFn);

              it("", testMockFn);
            });
          });
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should call before each hook three times", () => {
        expect(beforeEachMockFn).toBeCalledTimes(3);
      });
    });

    describe("when defined after a describe", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          describe("", () => {
            beforeEach(beforeEachMockFn);

            it("", testMockFn);

            describe("", () => {
              beforeEach(beforeEachMockFn);

              it("", testMockFn);
            });

            it("", testMockFn);
          });
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should call before each hook four times", () => {
        expect(beforeEachMockFn).toBeCalledTimes(4);
      });
    });
  });

  describe("afterEach", () => {
    describe("when defined at top level", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          afterEach(afterEachMockFn);

          it("", testMockFn);
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should call after each hook once", () => {
        expect(afterEachMockFn).toBeCalledTimes(1);
      });
    });

    describe("when no tests defined", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          afterEach(afterEachMockFn);
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should call after each hook zero times", () => {
        expect(afterEachMockFn).toBeCalledTimes(0);
      });
    });

    describe("when defined after test", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          it("", testMockFn);

          afterEach(afterEachMockFn);
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should not run after each hook for test", () => {
        expect(afterEachMockFn).toBeCalledTimes(0);
      });
    });

    describe("when defined in a describe", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          describe("", () => {
            afterEach(afterEachMockFn);

            it("", testMockFn);
          });
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should call after each hook once", () => {
        expect(afterEachMockFn).toBeCalledTimes(1);
      });
    });

    describe("when defined multiple times as same level", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          describe("", () => {
            afterEach(afterEachMockFn);
            afterEach(afterEachMockFn);

            it("", testMockFn);
          });
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should call after each hook twice", () => {
        expect(afterEachMockFn).toBeCalledTimes(2);
      });
    });

    describe("when defined at multiple levels", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          describe("", () => {
            afterEach(afterEachMockFn);

            describe("", () => {
              afterEach(afterEachMockFn);

              it("", testMockFn);
            });
          });
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should call after each hook twice", () => {
        expect(afterEachMockFn).toBeCalledTimes(2);
      });
    });

    describe("when defined at multiple levels with multiple tests", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          describe("", () => {
            afterEach(afterEachMockFn);

            it("", testMockFn);

            describe("", () => {
              afterEach(afterEachMockFn);

              it("", testMockFn);
            });
          });
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should call before each hook three times", () => {
        expect(afterEachMockFn).toBeCalledTimes(3);
      });
    });

    describe("when defined after a describe", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          describe("", () => {
            afterEach(afterEachMockFn);

            it("", testMockFn);

            describe("", () => {
              afterEach(afterEachMockFn);

              it("", testMockFn);
            });

            it("", testMockFn);
          });
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should call before each hook four times", () => {
        expect(afterEachMockFn).toBeCalledTimes(4);
      });
    });
  });

  describe("test descriptions", () => {
    beforeEach(() => {
      setup.testFilePaths = [
        "./src/middlewear/testUtils/exampleTests/spec/describeTestDescriptionTest.js"
      ];

      specSyntax(setup);
    });

    it("should have correct nesting", () => {
      expect(setup.tests[0].description).toEqual("describe 1 test 1");
      expect(setup.tests[1].description).toEqual(
        "describe 1 describe 2 test 2"
      );
      expect(setup.tests[2].description).toEqual(
        "describe 1 describe 2 describe 3 test 3"
      );
      expect(setup.tests[3].description).toEqual(
        "describe 1 describe 2 test 4"
      );
    });
  });

  describe("skip", () => {
    beforeEach(() => {
      setup.testFilePaths = [
        "./src/middlewear/testUtils/exampleTests/spec/skipTest.js"
      ];

      specSyntax(setup);
      runSetupTests(setup);
    });

    it("should label test as skipped", () => {
      expect(setup.tests[0].runState).toEqual("skip");
      expect(setup.tests[1].runState).toEqual("skip");
    });

    it("should not run tests", () => {
      expect(testMockFn).toBeCalledTimes(0);
    });
  });
});
