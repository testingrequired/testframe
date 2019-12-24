import Setup from "./Setup";
import Results from "./Results";

export type SetupExecutorReturn = void | ResultsExecutor;

export interface SetupExecutor {
  (setup: Setup): Promise<SetupExecutorReturn> | SetupExecutorReturn;
}

export interface ResultsExecutor {
  (results: Results): void | Promise<void>;
}

type Middleware = SetupExecutor;

export default Middleware;
