import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Logo, LOGO_STRING } from '../Logo';

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

it('renders the logo with the appropiate string', () => {
  act(() => {
    render(<Logo/>, container);
  });
  expect(container.textContent).toBe(LOGO_STRING);
});
