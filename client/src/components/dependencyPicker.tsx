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
  return(
    <Autocomplete
      multiple
      options={mockDepencencies.sort(compareDependencies)}
      isOptionEqualToValue={(option, value) => option.library === value.library }
      filterSelectedOptions
      getOptionLabel={(option) => option.library}
      onChange={(event, value) => props.handleChange(event, value)}
      value={props.dependencies}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="Dependencies"/>
      )}
    />
  );
}
