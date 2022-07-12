import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

test('renders title', () => {
  render(<App/>);
  const title = screen.getByText('VCPKG MANIFEST');
  expect(title).toBeInTheDocument();
});
