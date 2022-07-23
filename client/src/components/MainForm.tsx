import { useEffect, useReducer, useState } from 'react';
import { Box } from '@mui/material';
import { Dependency, VCPKGManifest } from '../types'
// import BuiltinBaseline from './BuiltinBaseline';
import ClearForm from './ClearForm';
import DependenciesSection from './DependenciesSection';
import DependencyPicker from './DependencyPicker';
import Description from './Description';
import FetchingBackdrop from './FetchingBackdrop';
import GenerateFileButton from './GenerateFileButton';
import Name from './Name'
import Version from './Version';

interface MainFormParams {
  generateFile: Function,
  generating:   boolean
};

const initialState: VCPKGManifest = {
  name: '',
  version: '',
  description: '',
  dependencies: []
  // builtinBaseline: ''
};

function MainForm(props: MainFormParams) {
  const formReducer = (state: VCPKGManifest, action: any) => {
    return {
      ...state,
      [action.name]: action.value
    }
  }

  const [form_data, setFormData] = useReducer(formReducer, initialState);
  // hook for fetched libraries
  const [json_libraries, setJSONLibraries] = useState([]);
  // hook for the dependencies list
  const [dependencies_list, setDependenciesList] = useState<Dependency[]>([]);
  // hook to tell the user that we are loading the data from the server
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLibraries() {
      const response = await fetch('https://frozen-castle-16536.herokuapp.com/https://vcpkg-manifest.herokuapp.com/libraries/');
      // const response = await fetch(`http://localhost:5000/libraries/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      setJSONLibraries(await response.json());
      let dep_list: Dependency[] = [];

      const inserter = (lib: any) => {
        dep_list.push({
          name:        lib.name,
          version:     lib['version-string'] || lib.version,
          description: lib.description
        });
      }

      json_libraries.forEach(inserter);
      setDependenciesList(dep_list);
      setLoading(false);
    }
    fetchLibraries();
  }, [json_libraries.length]);

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
    setFormData({
      name: 'builtinBaseline',
      value: '',
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
      name: 'dependencies',
      value: value
    });
  }

  const removeDependency = (dependency: Dependency) => {
    setFormData({
      name: 'dependencies',
      value: (form_data.dependencies as Dependency[]).filter(dep => dep !== dependency)
    });
  }

  return(
    <Box>
      
      <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '75ch' }}} autoComplete="on" alignItems="center" display="flex" justifyContent="center">
        <FetchingBackdrop loading={loading}/>
        {!loading && <Box>
            <fieldset disabled={props.generating}>
              <div>
              <Name name={form_data.name} handleChange={handleChange}/>
            </div>
            <div>
              <Version version={form_data.version} handleChange={handleChange}/>
            </div>
            <div>
              <Description description={form_data.description} handleChange={handleChange}/>
            </div>
            {/* <div>
              <BuiltinBaseline builtinBaseline={form_data.builtinBaseline} handleChange={handleChange}/>
            </div> */}
            <div>
              <DependencyPicker dependencies={form_data.dependencies as Dependency[]} dependencies_list={dependencies_list} handleChange={handleSelectChange}/>
            </div>
            <div>
              <GenerateFileButton generateFunc={() => props.generateFile(form_data)}/>
              <ClearForm clearFunc={clearForm}/>
            </div>
          </fieldset>
        </Box>}
      </Box>

      <Box>
        {(form_data.dependencies as Dependency[]).length > 0 &&
          <DependenciesSection
            dependencies={form_data.dependencies as Dependency[]}
            generating={props.generating}
            removeFunc={removeDependency}
          />
        }
      </Box>

    </Box>
  );
}

export default MainForm;
