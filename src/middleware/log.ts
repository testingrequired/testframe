import globals from "./globals";
import Setup from "../types/Setup";
import { compose } from ".";
import event from "./event";
import Result from "../types/Result";

export default (setup: Setup) => {
  const logs: Array<string> = [];

  return compose(
    globals("console", consoleGlobalProxy(logs)),
    event("results", (results: Array<Result>) => {
      if (logs.length) {
        console.log("Logs\n");
        logs.forEach(log => console.log(`- ${log}\n`));
        console.log("\n");
      }
    })
  )(setup);
};

function consoleGlobalProxy(logs: Array<string>) {
  const log = (method: string) => (...args: Array<any>) => {
    const line = args.map(arg => JSON.stringify(arg)).join(" ");
    logs.push(`${method}: ${line}`);
  };

  return new Proxy(console, {
    get: (target, prop: string) => {
      return log(prop);
    }
  });
}
