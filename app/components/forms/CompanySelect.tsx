import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

type Company = { id: number; name: string };
type CompanySelectProps = {
  companies: Company[];
  onChange: (id?: string) => void;
  selectedId: string | undefined;
};
export function CompanySelect({ companies, onChange, selectedId }: CompanySelectProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const idStr = event.target.value;
    onChange(idStr);
  };

  const defaultId = companies?.[0]?.id;
  const value = selectedId ?? (defaultId !== undefined ? String(defaultId) : '');

  return (
    <FormControl fullWidth>
      <InputLabel id="company-select-label">Company</InputLabel>
      <Select labelId="company-select-label" value={value} onChange={handleChange} label="Company">
        {companies.map(company => (
          <MenuItem key={company.id} value={String(company.id)}>
            {company.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
