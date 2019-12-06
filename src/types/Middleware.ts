import Setup from "./Setup";
import Results from "./Results";
import { EventEmitter } from "events";

export interface SetupExecutor {
  (setup: Setup): void | ResultsExecutor;
}

export interface ResultsExecutor {
  (results: Results): void;
}

type Middleware = SetupExecutor;

export default Middleware;
