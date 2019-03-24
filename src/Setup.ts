export default interface Setup {
  testFilePaths: Array<string>;
  components: { [key: string]: any };
  tests: Array<[string, string, (assert: any, components: any) => void]>;
  beforeAlls: Array<() => void>;
  beforeEachs: Array<() => void>;
  afterEachs: Array<() => void>;
  afterAlls: Array<() => void>;
}
