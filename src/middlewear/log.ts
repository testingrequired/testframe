import globals from "./globals";
import Setup from "../types/Setup";
import Results from "../types/Results";

export default (setup: Setup) => {
  const logs = [];

  function log(...args) {
    logs.push(args.map(arg => JSON.stringify(arg)).join(" "));
  }

  globals("log", log)(setup);

  return (results: Results) => {
    if (logs.length) {
      console.log("Logs\n");
      logs.forEach(log => console.log(log));
      console.log("\n");
    }
  };
};
