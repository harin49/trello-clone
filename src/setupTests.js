import { createSerializer } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";

configure({ adapter: new Adapter() }); // Setup default enzyme adapter
expect.addSnapshotSerializer(createSerializer({ mode: "deep" })); // Enables neater snapshots!
const originalConsoleError = console.error; // eslint-disable-line no-console
// eslint-disable-next-line no-console
console.error = message => {
  // Fail tests on prop type errors. There's some required prop missing if you see this in stack trace!
  if (/(Failed prop type)|Warning/.test(message)) {
    throw new Error(message);
  }
  originalConsoleError(message);
};
