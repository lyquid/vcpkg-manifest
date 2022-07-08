import { SyntheticEvent, useReducer, useState } from 'react';
import { Alert, Autocomplete, Box, Button, TextField } from '@mui/material';

type Dependency = {
  library: string,
  version: string
};

function compareDependencies(a: Dependency, b: Dependency) {
  if (a.library.toLocaleLowerCase() < b.library.toLocaleLowerCase()) return -1;
  if (a.library.toLocaleLowerCase() > b.library.toLocaleLowerCase()) return 1;
  return 0;
}

type VCPKGManifest = {
  name: string,
  version: string,
  dependencies: Dependency[]
};

const initialState: VCPKGManifest = {
  name: '',
  version: '',
  dependencies: []
};

const formReducer = (state: VCPKGManifest, action: any) => {
  return {
    ...state,
    [action.name]: action.value
  }
}

function MainForm() {
  const [formData, setFormData] = useReducer(formReducer, initialState);
  const [generating, setGenerating] = useState(false);

  const clearForm = (): void => {
    setFormData({
      name: 'name',
      value: '',
    });
    setFormData({
      name: 'version',
      value: '',
    });
    setFormData({
      name: 'dependencies',
      value: [],
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      name: event.target.name,
      value: event.target.value
    });
  }

  const handleSelectChange = (event: React.SyntheticEvent, value: Dependency[]): void => {
    setFormData({
      name: "dependencies", // ugly hack!
      value: value
    });
  }

  const generateJSON = (): void => {
    const contentType = "text/plain";
    const fileName = "vcpkg.json";
    // disable fields
    setGenerating(true);
    // sort and manipulate the data to match vcpkg.json format
    // const data: VCPKGManifest = JSON.parse(JSON.stringify(formData)); // deep copy, no changes to the form
    const data = formData; // shallow copy, the form will be sorted
    const dependencies: string[] = [];
    for (let dependency of data.dependencies.sort(compareDependencies)) {
      dependencies.push(dependency.library);
    }
    const finalData = {
      name: data.name,
      version: data.version,
      dependencies: dependencies
    };
    // create file
    const finalDataStringified = JSON.stringify(finalData, null, 2);
		const file = new Blob([finalDataStringified], { type: contentType });
    // create link & download
    const link = document.createElement("a");
		link.href = URL.createObjectURL(file);
		link.download = fileName;
		link.click();
    // re-enable fields after x time
    setTimeout(() => { setGenerating(false); }, 1000);
  }

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

  return(
    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '75ch' },}} autoComplete="on">
      <fieldset disabled={generating}>
        {generating && <Alert severity="info" variant='standard'>Generating vcpkg.json</Alert>}

        <div>
          <TextField label="App name" name="name" onChange={handleChange} value={formData.name}/>
        </div>

        <div>
          <TextField label="Version" name="version" onChange={handleChange} value={formData.version}/>
        </div>

        <div>
          <Autocomplete
            multiple
            options={mockDepencencies.sort(compareDependencies)}
            isOptionEqualToValue={(option, value) => option.library === value.library }
            filterSelectedOptions
            getOptionLabel={(option) => option.library}
            onChange={handleSelectChange}
            value={formData.dependencies}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Dependencies"/>
            )}
          />
        </div>

        <div>
          <Button variant="contained" color="primary" onClick={generateJSON}>Generate vcpkg.json</Button>
          <Button variant="contained" color="error" onClick={clearForm}>Clear fields</Button>
        </div>

      </fieldset>
    </Box>
  );
}

export default MainForm;
