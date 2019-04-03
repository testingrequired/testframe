import tf, { defaults, compose, callback } from "./lib/index";

export default tf(
  compose(
    callback((setup, results, events) => {
      events.on("test:failure", result => {
        console.log(`${result.description} failed!!`);
      });
    }),
    defaults()
  )
);
