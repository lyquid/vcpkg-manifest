import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import Name from '../Name';

let container: any; // :(

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders without crashing", () => {
  render(<Name handleChange={()=>{}} name=""/>, container);
});

// it("sets the name correctly", () => {
//   const name = "holamanola";
//   render(<Name handleChange={()=>{}} name={name}/>, container);
//   expect(container. ).toBe(name);
// });
