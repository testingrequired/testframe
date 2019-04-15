import tf, { defaults, compose, event } from "./lib/index";

export default tf(
  compose(
    defaults(),
    setup => {
      console.log(JSON.stringify(setup.args));
    },
    event("test:failure", result => {
      console.log(`${result.description} failed!!`);
    })
  )
);
