import Setup from "./Setup";
import Results from "./Results";
import { EventEmitter } from "events";

type Middlewear = (
  setup: Setup,
  results: Results,
  events?: EventEmitter
) => void;
export default Middlewear;
