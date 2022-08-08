import { Autocomplete, Chip, TextField, Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import { Controller, Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { compareDependencies, Dependency, VCPKGManifest } from '../../types'

interface PickerParams {
  control: Control<VCPKGManifest, object>
  dependenciesList: Dependency[],
  handleChange: Function,
};

export default function DependencyPicker(props: PickerParams) {

  const { t } = useTranslation();

  return (
    <Controller
      render={(renderProps) => (
        <Autocomplete multiple
          filterSelectedOptions
          getOptionLabel={(option: Dependency) => option.name}
          isOptionEqualToValue={(option: Dependency, value: Dependency) =>
            option.name === value.name
          }
          onChange={(event, values) => {
            props.handleChange(values);
          }}
          options={props.dependenciesList}
          renderInput={params => (
            <TextField
              {...params}
              label={t('mainForm.dependencies')}
              variant='standard'
              inputProps={{
                ...params.inputProps,
                autoComplete: 'off'
              }}
            />
          )}
          renderTags={(deps, getTagProps) => (
            deps.sort(compareDependencies).map((dep, index) => (
              <Tooltip
                arrow
                key={dep.name}
                title={dep.description ? dep.description : ''}
                TransitionComponent={Zoom}
              >
                <Chip
                  {...getTagProps({index})}
                  color='primary'
                  label={dep.name}
                  sx={ theme => ({
                    '&:hover': { backgroundColor: theme.palette.primary.dark }
                  })}
                />
              </Tooltip>
            ))
          )}
          value={renderProps.field.value}
        /> // end AutoComplete
      )}
      name='dependencies'
      control={props.control}
      defaultValue={[]}
    />
  );
}
