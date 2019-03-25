export default interface Test {
  testFilePath: string;
  description: string;
  fn: (assert: any, components: any) => void;
  beforeEachs: Array<() => void>;
  afterEachs: Array<() => void>;
}
