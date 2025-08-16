import { render, screen } from '@testing-library/react';

import { Hello } from './Hello';

describe('Hello component', () => {
  it('renders greeting with provided name', () => {
    render(<Hello name="Tester" />);
    expect(screen.getByText(/Tester/)).toBeInTheDocument();
  });
});