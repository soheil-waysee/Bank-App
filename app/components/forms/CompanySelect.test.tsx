import { render, screen } from '@testing-library/react';
import { CompanySelect } from './CompanySelect';

describe('CompanySelect (with mocked MUI)', () => {
  const companies = [
    { id: 1, name: 'Company A' },
    { id: 2, name: 'Company B' },
  ];

  it('renders label and company options', () => {
    render(<CompanySelect companies={companies} selectedId={undefined} onChange={() => {}} />);

    expect(screen.getByTestId('InputLabel')).toBeInTheDocument();
    expect(screen.getByTestId('Select')).toHaveTextContent('Company A');
    expect(screen.getAllByTestId('MenuItem')).toHaveLength(2);
    expect(screen.getAllByTestId('MenuItem')[1]).toHaveTextContent('Company B');
  });

  it('uses selectedId if provided', () => {
    render(<CompanySelect companies={companies} selectedId={'2'} onChange={() => {}} />);

    expect(screen.getByTestId('Select')).toHaveTextContent('Company B');
  });

  it('calls onChange with selected company id', () => {
    const handleChange = jest.fn();

    const { rerender } = render(
      <CompanySelect companies={companies} selectedId={'1'} onChange={handleChange} />
    );

    rerender(<CompanySelect companies={companies} selectedId={'2'} onChange={handleChange} />);

    expect(screen.getByTestId('Select')).toHaveTextContent('Company B');
  });
});
