import Setup from "../types/Setup";

export default (key, value) => (setup: Setup) => {
  if (setup.globals[key]) {
    throw new Error(
      `Global '${key}' already registered. Please check your middlewear load order.`
    );
  }

  setup.globals[key] = value;
};
