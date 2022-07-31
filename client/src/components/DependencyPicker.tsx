import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Controller, Control } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { Dependency, VCPKGManifest } from '../types'

interface PickerParams {
  // dependencies: Dependency[],
  dependenciesList: Dependency[],
  // handleChange: Function,
  control: Control<VCPKGManifest, object>
};

export default function DependencyPicker(props: PickerParams) {
  return (<div></div>);
  //   <Controller
  //     render={(props) => (
  //       <Autocomplete
  //         multiple
  //         options={dependenciesList}
  //         isOptionEqualToValue={(option: Dependency, value: Dependency) => option.name === value.name }
  //         filterSelectedOptions
  //         getOptionLabel={(option: any) => option.name}
  //         value={props.field.value}
  //         onChange={(event, values) => {
  //           setValue("dependencies", values);
  //           setDependenciesCount(getValues('dependencies')!.length);
  //         }}
  //         inputValue={inputValue}
  //         onInputChange={(event, newInputValue) => {
  //           setInputValue(newInputValue);
  //         }}
  //         renderInput={params => (
  //           <TextField
  //             {...params}
  //             label="dependencies"
  //             // label={t('mainForm.dependencies')}
  //             variant="standard"
  //             inputProps={{
  //               ...params.inputProps,
  //               autoComplete: "disabled"
  //             }}
  //           />
  //         )}
  //       />
  //     )}
  //     name="dependencies"
  //     control={control}
  //     defaultValue={[]}
  //   /> {/* end controller */}
  // );
}

// export default function DependencyPicker(props: PickerParams) {
//   // const [open, setOpen] = useState(false); // TODO
//   const { t } = useTranslation();

//   return(
//     <Controller as={
//       <Autocomplete
//         multiple
//         options={dependenciesList}
//         isOptionEqualToValue={(option, value) => option.name === value.name }
//         filterSelectedOptions
//         getOptionLabel={(option) => option.name}
//         renderOption={(option) => (
//           <React.Fragment>
//             {/* <Checkbox
//               icon={icon}
//               checkedIcon={checkedIcon}
//               style={{ marginRight: 8 }}
//               checked={selected}
//             /> */}
//             {option.name}
//           </React.Fragment>
//         )}
//         // value={dependencies}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="standard"
//             label={t('mainForm.dependencies')}
//             inputProps={{
//               ...params.inputProps,
//               autoComplete: "disabled" // disable autocomplete and autofill
//             }}
//           />
//         )}
//         fullWidth
//       />
//     }
//     onChange={(event, value) => { return value} }
//     name="dependencies"
//     control={control}
//     />

//   ); // end return
// }
