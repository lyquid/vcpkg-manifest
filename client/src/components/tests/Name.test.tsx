import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Name from '../main_form/Name';

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

// it('renders the name with provided name', () => {
//   let mock_name = 'Holamanola';
//   act(() => {
//     render(<Name name={mock_name} handleChange={()=>{}} />, container);
//   });
//   // expect(container.getBy ).toBe(mock_name);
// });
