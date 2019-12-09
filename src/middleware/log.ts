import globals from "./globals";
import Setup from "../types/Setup";
import Results from "../types/Results";

export default (setup: Setup) => {
  const logs: Array<string> = [];

  const log = (method: string) => (...args: Array<any>) => {
    const line = args.map(arg => JSON.stringify(arg)).join(" ");
    logs.push(`${method}: ${line}`);
  };

  const consoleProxy = new Proxy(console, {
    get: (target, prop: string) => {
      return log(prop);
    }
  });

  globals("console", consoleProxy)(setup);

  return (results: Results) => {
    if (logs.length) {
      console.log("Logs\n");
      logs.forEach(log => console.log(`- ${log}\n`));
      console.log("\n");
    }
  };
};
