import tf, { defaults, compose, event } from "./lib/index";

export default tf(
  compose(
    defaults(),
    event("test:failure", result => {
      console.log(`${result.description} failed!!`);
    })
  )
);
