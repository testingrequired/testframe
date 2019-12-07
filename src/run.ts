export default (...configs: Array<() => void>) => {
  configs.forEach(config => config());
  process.exit(0);
};
