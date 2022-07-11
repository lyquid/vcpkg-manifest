import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { compareDependencies, Dependency } from '../types'

const mockDepencencies: Dependency[] = [
  {library: 'gTest', version: ''},
  {library: 'boost', version: ''},
  {library: 'SDL2', version: ''},
  {library: 'ZZtop', version: ''},
  {library: 'SFML', version: ''},
  {library: 'abc', version: ''},
  {library: 'Acb', version: ''},
  {library: 'Abc', version: ''},
  {library: 'glm', version: ''}
];

interface PickerParams {
  dependencies: Dependency[],
  handleChange: Function
};

export default function DependencyPicker(props: PickerParams) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getLibraries() {
      const response = await fetch(`http://localhost:5000/libraries/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records_d = await response.json();
      setRecords(records_d);
    }

    getLibraries();
    console.log(records);
    return;
  }, [records, records.length]);

  return(
    <Autocomplete
      multiple
      options={mockDepencencies.sort(compareDependencies)}
      // options={records}
      isOptionEqualToValue={(option, value) => option.library === value.library }
      filterSelectedOptions
      getOptionLabel={(option) => option.library}
      onChange={(event, value) => props.handleChange(event, value)}
      value={props.dependencies}
      // value={records}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="Dependencies"/>
      )}
    />
  );
}
