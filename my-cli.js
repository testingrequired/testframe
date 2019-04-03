import tf, { defaults, compose, event } from "./lib/index";

export default tf(
  compose(
    event("test:failure", result => {
      console.log(`${result.description} failed!!`);
    }),
    defaults()
  )
);
