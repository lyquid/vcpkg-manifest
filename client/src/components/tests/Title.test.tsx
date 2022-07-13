import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import Title from '../Title';

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

it("renders the title", () => {
  const title = 'VCPKG MANIFEST';
  render(<Title/>, container);
  expect(screen.getByText(title)).toBeInTheDocument();
});
