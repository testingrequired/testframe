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
    afterEachMockFn = jest.fn();
    testMockFn = jest.fn();

    setup = createSetup();

    setup.testFilePaths = [expectedTestPath];
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe("describe", () => {
    let describeMockFn;

    beforeEach(() => {
      describeMockFn = jest.fn();

      jest.mock(mockTestPath, () => {
        describe("describe", describeMockFn);
      });

      specSyntax(setup);
    });

    it("should call describe function", () => {
      expect(describeMockFn).toBeCalledTimes(1);
    });

    describe("when defined as a skipped describe", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          describe("", () => {
            it("", testMockFn);

            describe.skip("", () => {
              it("", testMockFn);
              it("", testMockFn);

              describe("", () => {
                it("", testMockFn);
              });
            });

            it("", testMockFn);
          });
        });

        specSyntax(setup);
        runSetupTests(setup);
      });

      it("should set all tests at that level to skip", () => {
        expect(setup.tests[1].runState).toEqual("skip");
        expect(setup.tests[2].runState).toEqual("skip");
        expect(setup.tests[3].runState).toEqual("skip");
      });

      it("should leave all tests at higher level to run", () => {
        expect(setup.tests[0].runState).toEqual("run");
        expect(setup.tests[4].runState).toEqual("run");
      });
    });
  });

  describe("it", () => {
    describe("when defined at top level", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          it("test", testMockFn);
        });

        specSyntax(setup);
      });

      it("should define a test", () => {
        expect(setup.tests).toHaveLength(1);
      });

      it("should not call test function", () => {
        expect(testMockFn).toBeCalledTimes(0);
      });

      it("should set test description", () => {
        expect(setup.tests[0].description).toEqual("test");
      });
    });

    describe("when defined in a describe", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          describe("describe", () => {
            it("test", testMockFn);
          });
        });

        specSyntax(setup);
      });

      it("should prepend the describe description to test description", () => {
        expect(setup.tests[0].description).toEqual("describe test");
      });
    });

    describe("when defined with a describe inside", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          describe("describe", () => {
            it("test", () => {
              describe("", () => {});
            });
          });
        });
      });

      it("should throw reference error", () => {
        expect(() => {
          specSyntax(setup);
          runSetupTests(setup);
        }).toThrow(ReferenceError);
      });
    });

    describe("when defined as a skipped test", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          it.skip("test", testMockFn);
        });

        specSyntax(setup);
      });

      it("should have a skipped run state", () => {
        expect(setup.tests[0].runState).toEqual("skip");
      });
    });
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

    describe("when test is skipped", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          beforeEach(beforeEachMockFn);

          it.skip("", testMockFn);
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

    describe("when test is skipped", () => {
      beforeEach(() => {
        jest.mock(mockTestPath, () => {
          afterEach(afterEachMockFn);

          it.skip("", testMockFn);
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
});
