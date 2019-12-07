import globals from "./globals";
import Setup from "../types/Setup";
import Results from "../types/Results";

export default (setup: Setup) => {
  const logs: Array<string> = [];

  function log(...args: Array<any>) {
    logs.push(args.map(arg => JSON.stringify(arg)).join(" "));
  }

  const consoleProxy = new Proxy(console, {
    get: (target, prop) => {
      return log;
    }
  });

  globals("log", log)(setup);
  globals("console", consoleProxy)(setup);

  return (results: Results) => {
    if (logs.length) {
      console.log("Logs\n");
      logs.forEach(log => console.log(`- ${log}\n`));
      console.log("\n");
    }
  };
};
