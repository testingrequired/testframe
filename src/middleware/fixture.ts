import Setup from "../types/Setup";

export default <T>(key: string, value: (setup: Setup) => Promise<T>) => (
  setup: Setup
) => {
  let cache: T;

  if (setup.fixtures[key]) {
    throw new Error(
      `Fixture '${key}' already registered. Please check your middleware load order.`
    );
  }

  Object.defineProperty(setup.fixtures, key, {
    get: async () => {
      if (!cache) {
        cache = await value.call(null, setup);
      }

      return cache;
    }
  });
};
