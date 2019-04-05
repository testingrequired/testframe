import Setup from "./Setup";
import Results from "./Results";
import { EventEmitter } from "events";

export type MiddlewearExecutor = () => void;

type Middlewear = (
  setup: Setup,
  results: Results,
  events?: EventEmitter
) => void | MiddlewearExecutor;

export default Middlewear;
