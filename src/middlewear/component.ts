import Setup from "../types/Setup";

export default (key, value) => (setup: Setup) => {
  setup.components[key] = value;
};
