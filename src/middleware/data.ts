import fixture from "./fixture";
import Setup from "../types/Setup";
import glob from "glob";
import path from "path";
import { readFile } from "fs";
import util from "util";

const readFileAsync = util.promisify(readFile);

export default fixture("data", async (setup: Setup) => {
  const { args } = setup;
  const { dataDir = "tests/data" } = args;

  const files = glob
    .sync(`${dataDir}/**/*.*`, {
      cwd: process.cwd(),
      absolute: true,
      ignore: ["./node_modules"]
    })
    .map(dataFilePath => path.relative(process.cwd(), dataFilePath));

  debugger;

  const data: Record<string, any> = {};

  for (const file of files) {
    const ext = path.extname(file);

    debugger;

    switch (ext) {
      case ".json":
        debugger;

        data[file] = await jsonHandler(file);
        debugger;
        break;

      default:
        debugger;
        break;
    }
  }

  debugger;

  return data;
});

async function jsonHandler(path: string) {
  debugger;
  try {
    const raw = await readFileAsync(path, "utf8");
    debugger;
    return JSON.parse(raw);
  } catch (e) {
    debugger;
  }
  debugger;
}
