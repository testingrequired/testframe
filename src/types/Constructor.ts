export default interface Constructor<T> extends Function {
  new(...args: any[]): T;
}
