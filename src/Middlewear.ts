import Setup from "./Setup";
import Results from "./Results";

type Middlewear = (setup: Setup, results: Results) => void;
export default Middlewear;
