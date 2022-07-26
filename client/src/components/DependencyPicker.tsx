import { Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Dependency } from '../types'

interface PickerParams {
  dependencies: Dependency[],
  dependenciesList: Dependency[],
  handleChange: Function
};

export default function DependencyPicker(props: PickerParams) {
  // const [open, setOpen] = useState(false); // TODO
  const { t } = useTranslation();

  return(
    <Autocomplete
      multiple
      options={props.dependenciesList}
      isOptionEqualToValue={(option, value) => option.name === value.name }
      filterSelectedOptions
      getOptionLabel={(option) => option.name}
      onChange={(event, value) => props.handleChange(event, value)}
      value={props.dependencies}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label={t('mainForm.dependencies')}/>
      )}
      fullWidth
    />
  );
}
