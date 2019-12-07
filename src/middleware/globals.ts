import Setup from "../types/Setup";

export default (key: string, value: any) => (setup: Setup) => {
  if (setup.globals[key]) {
    throw new Error(
      `Global '${key}' already registered. Please check your middleware load order.`
    );
  }

  setup.globals[key] = value;
};
