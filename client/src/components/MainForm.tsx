import React from 'react';
import { useEffect, useReducer, useState } from 'react';
import { Box, Grid, Paper, styled } from '@mui/material';
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

const FormItem = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1.5),
  textAlign: 'center',
  // color: theme.palette.text.secondary,
}))

function MainForm(props: MainFormParams) {
  const formReducer = (state: VCPKGManifest, action: any) => {
    return {
      ...state,
      [action.name]: action.value
    }
  }

  const [formData, setFormData] = useReducer(formReducer, initialState);
  // hook for fetched libraries
  const [jsonLibraries, setJSONLibraries] = useState([]);
  // hook for the dependencies list
  const [dependenciesList, setDependenciesList] = useState<Dependency[]>([]);
  // hook to tell the user that we are loading the data from the server
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLibraries() {
      const response = await fetch('https://frozen-castle-16536.herokuapp.com/https://vcpkg-manifest.herokuapp.com/libraries/');
      // const response = await fetch('http://localhost:5000/libraries/');
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

      jsonLibraries.forEach(inserter);
      setDependenciesList(dep_list);
      setLoading(false);
    }
    fetchLibraries();
  }, [jsonLibraries.length]);

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
      value: (formData.dependencies as Dependency[]).filter(dep => dep !== dependency)
    });
  }

  return(
    <React.Fragment>
      <FetchingBackdrop loading={loading}/>
      {!loading && <Grid component="form" sx={{ display: 'flex', flexDirection: 'column', mx: 'auto', maxWidth: '50em' }} autoComplete="on">
        <fieldset disabled={props.generating}>
          <FormItem>
            <Name name={formData.name} handleChange={handleChange}/>
          </FormItem>
          <FormItem>
            <Version version={formData.version} handleChange={handleChange}/>
          </FormItem>
          <FormItem>
            <Description description={formData.description} handleChange={handleChange}/>
          </FormItem>
          {/* <FormItem>
            <BuiltinBaseline builtinBaseline={formData.builtinBaseline} handleChange={handleChange}/>
          </FormItem> */}
          <FormItem>
            <DependencyPicker dependencies={formData.dependencies as Dependency[]} dependenciesList={dependenciesList} handleChange={handleSelectChange}/>
          </FormItem>
          <FormItem>
            <GenerateFileButton generateFunc={() => props.generateFile(formData)}/>
            <ClearForm clearFunc={clearForm}/>
          </FormItem>
        </fieldset>
      </Grid>}

      {(formData.dependencies as Dependency[]).length > 0 && <Box>
        <DependenciesSection
          dependencies={formData.dependencies as Dependency[]}
          generating={props.generating}
          removeFunc={removeDependency}
        />
      </Box>}
    </React.Fragment>
  );
}

export default MainForm;
