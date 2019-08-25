import callWith from "./utils/callWith";

export default (...tfs: Array<() => void>) => {
  tfs.forEach(callWith());
  process.exit(0);
};
