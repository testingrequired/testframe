import tf, { defaults, compose, event } from "./lib/index";

export default tf(
  defaults,
  compose(
    setup => {
      console.log(JSON.stringify(setup.args));
    },
    event("test:failure", result => {
      console.log(`${result.description} failed!!`);
    })
  )
);
