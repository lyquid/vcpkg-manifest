import { SyntheticEvent, useReducer, useState } from 'react';
import { Box } from '@mui/material';
import { Dependency, VCPKGManifest } from '../types'
import ClearForm from './ClearForm';
import DependenciesSection from './DependenciesSection';
import DependencyPicker from './DependencyPicker';
import Description from './Description';
import generateJSON from '../generateJSON';
import GenerateFileButton from './GenerateFileButton';
import GeneratingAlert from './GeneratingAlert';
import Name from './Name'
import Version from './Version';

const initialState: VCPKGManifest = {
  name: '',
  version: '',
  description: '',
  dependencies: []
};

function MainForm() {
  const formReducer = (state: VCPKGManifest, action: any) => {
    return {
      ...state,
      [action.name]: action.value
    }
  }

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
      name: 'description',
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
      {generating && <GeneratingAlert/>}
      <Box>
        <fieldset disabled={generating}>
          <div>
            <Name name={formData.name} handleChange={handleChange}/>
          </div>
          <div>
            <Version version={formData.version} handleChange={handleChange}/>
          </div>
          <div>
            <Description description={formData.description} handleChange={handleChange}/>
          </div>
          <div>
            <DependencyPicker dependencies={formData.dependencies} handleChange={handleSelectChange}/>
          </div>
          <div>
            <GenerateFileButton generateFunc={generateFile}/>
            <ClearForm clearFunc={clearForm}/>
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
