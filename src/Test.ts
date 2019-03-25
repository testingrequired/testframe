export default interface Test {
  testFilePath: string;
  description: string;
  fn: (components: any) => void;
  beforeEachs: Array<() => void>;
  afterEachs: Array<() => void>;
}
