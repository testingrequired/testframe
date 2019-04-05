import Setup from "./Setup";
import Results from "./Results";
import { EventEmitter } from "events";

export type SetupExecutor = (
  setup: Setup,
  events?: EventEmitter
) => void | ResultsExecutor;

export type ResultsExecutor = (results: Results) => void;

type Middlewear = SetupExecutor;

export default Middlewear;
