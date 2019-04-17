let value;

beforeEach(global.beforeEachMock);

afterEach(global.afterEachMock);

test(`test1`, global.testMock);

test.skip(`test2`, global.testMock);
