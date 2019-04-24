import callWith from "./utils/callWith";

export default (...tfs: Array<() => void>) => tfs.forEach(callWith());
