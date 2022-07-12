import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { compareDependencies, Dependency } from '../types'

const mockDepencencies: Dependency[] = [
  {name: 'gTest', version: ''},
  {name: 'boost', version: ''},
  {name: 'SDL2', version: ''},
  {name: 'ZZtop', version: ''},
  {name: 'SFML', version: ''},
  {name: 'abc', version: ''},
  {name: 'Acb', version: ''},
  {name: 'Abc', version: ''},
  {name: 'glm', version: ''}
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
      isOptionEqualToValue={(option, value) => option.name === value.name }
      filterSelectedOptions
      getOptionLabel={(option) => option.name}
      onChange={(event, value) => props.handleChange(event, value)}
      value={props.dependencies}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="Dependencies"/>
      )}
    />
  );
}
