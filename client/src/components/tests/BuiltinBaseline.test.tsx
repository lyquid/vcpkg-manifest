// import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import BuiltinBaseline from '../BuiltinBaseline'

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
  // container = null;
});

it("renders with or without a name", () => {
  const bb1 = 'b60f003ccf5fe8613d029f49f835c8929a66eb61';
  const bb2 = 'a14a6bcb27287e3ec138dba1b948a0cdbc337a3a';

  // render(<BuiltinBaseline handleChange={()=>{}}/>, container);
  // expect(container.querySelector("Select").textContent).toBe('');
  // // expect(container.textContent).toBe('');

  // render(<BuiltinBaseline builtinBaseline={bb1} handleChange={()=>{}}/>, container);
  // expect(container.compo ).toBe(bb1);

  // render(<BuiltinBaseline builtinBaseline={bb2} handleChange={()=>{}}/>, container);
  // expect(container.textContent).toBe(bb2);
});
