import { SyntheticEvent, useReducer, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Dependency, VCPKGManifest } from '../types'
import AppName from './AppName'
import AppVersion from './AppVersion';
import DependenciesSection from './DependenciesSection';
import DependencyPicker from './DependencyPicker';
import generateJSON from '../generateJSON';
import JSONGeneratingAlert from './JSONGeneratingAlert';

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

  const generateFile = (): void => {
    // disable fields
    setGenerating(true);
    // create file, link & download
    const fileName = "vcpkg.json";
    const link = document.createElement("a");
		link.href = URL.createObjectURL(generateJSON(formData));
		link.download = fileName;
		link.click();
    // re-enable fields after x time
    setTimeout(() => { setGenerating(false); }, 1000);
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

  const removeDependency = (dependency: Dependency) => {
    setFormData({
      name: 'dependencies',
      value: formData.dependencies.filter(dep => dep !== dependency)
    });
  }

  return(
    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '75ch' }}} autoComplete="on">
      {generating && <JSONGeneratingAlert/>}
      <Box>
        <fieldset disabled={generating}>
          <div><AppName appName={formData.name} handleChange={handleChange}/></div>
          <div><AppVersion appVersion={formData.version} handleChange={handleChange}/></div>
          <div><DependencyPicker dependencies={formData.dependencies} handleChange={handleSelectChange}/></div>
          <div>
            <Button variant="contained" color="primary" onClick={generateFile}>Generate vcpkg.json</Button>
            <Button variant="contained" color="error" onClick={clearForm}>Clear fields</Button>
          </div>
        </fieldset>
      </Box>

      {formData.dependencies.length > 0 &&
        <DependenciesSection
          dependencies={formData.dependencies}
          generating={generating}
          removeFunc={removeDependency}
        />
      }

    </Box>
  );
}

export default MainForm;
