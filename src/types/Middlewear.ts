import Setup from "./Setup";
import Results from "./Results";
import { EventEmitter } from "events";

export type ResultsExecutor = (results: Results) => void;

type Middlewear = (
  setup: Setup,
  events?: EventEmitter
) => void | ResultsExecutor;

export default Middlewear;
