import { render, fireEvent, waitFor } from '@testing-library/react';
import PatientList from '../components/patients/PatientList';
import { usePatients } from '../queries/patient';

vi.mock('../queries/patient', () => ({
  usePatients: vi.fn(),
}));

const mockPatients = [
  {resourceType: 'Patient', id: 'patient-1', full_name: 'John Doe', birth_date: '1990-01-01' },
  {resourceType: 'Patient', id: 'patient-2', full_name: 'John Wick', birth_date: '1995-02-02' },
  {resourceType: 'Patient', id: 'patient-3', full_name: 'Bob Smith', birth_date: '1980-03-03' },
];

// @ts-expect-error - Vitest mock
vi.mocked(usePatients).mockReturnValue({
  data: { patients: mockPatients },
  isLoading: false,
  isError: false,
  error: null,
  refetch: vi.fn(),
});

describe('PatientList', () => {
  it('filters patients by name', async () => {
    const { getByTestId, getByText, queryByText } = render(<PatientList />);
    const searchInput = getByTestId('search-input');

    // Simulate typing in the search input
    fireEvent.change(searchInput, { target: { value: 'john' } });

    // Simulate pressing the search button
    const searchButton = getByText('Search');
    fireEvent.click(searchButton);

    // Wait for the filtered patients to be rendered
    await waitFor(() => getByText('John Doe'));

    // Verify that only the filtered patients are rendered (exclude header row)
    const patientRows = document.querySelectorAll('tr:not(:has(th))');
    expect(patientRows.length).toBe(2);

    // Verify that only patients with the name "John" are rendered
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('John Wick')).toBeInTheDocument();
    expect(queryByText('Bob Smith')).not.toBeInTheDocument();
  });
});