import Setup from "../types/Setup";

export default (event: string, callback: any) => (
  setup: Setup
) => {
  setup.events.on(event, callback);
};
