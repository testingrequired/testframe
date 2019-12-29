import Setup from "../types/Setup";
type FixtureGetter<T> = () => T;

export default <T>(key: string, value: FixtureGetter<T>) => (setup: Setup) => {
  let cache: T;

  if (setup.fixtures[key]) {
    throw new Error(
      `Fixture '${key}' already registered. Please check your middleware load order.`
    );
  }

  Object.defineProperty(setup.fixtures, key, {
    get: () => {
      if (!cache) {
        cache = value.call(null);
      }

      return cache;
    }
  });
};
