import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Grid, Paper, styled } from '@mui/material';
import { Dependency, VCPKGManifest } from '../../types'
// import BuiltinBaseline from './BuiltinBaseline';
import ClearForm from './ClearForm';
import DependenciesSection from '../dependencies_section/DependenciesSection';
import DependencyPicker from './DependencyPicker';
import Description from './Description';
import FetchingBackdrop from '../FetchingBackdrop';
import GenerateFileButton from './GenerateFileButton';
import Name from './Name'
import Version from './Version';

interface MainFormParams {
  generateFile: Function,
  generating:   boolean
};

const FormItem = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function MainForm(props: MainFormParams) {
  // react-form-hook's hooks
  const { clearErrors, setValue, control, getValues, register, handleSubmit, formState: { errors } } = useForm<VCPKGManifest>();
  // hook for triggering the display of the dependencies section
  const [dependenciesCount, setDependenciesCount] = useState(0);
  // hook for the dependencies list
  const [dependenciesList, setDependenciesList] = useState<Dependency[]>([]);
  // hook for fetched libraries
  const [jsonLibraries, setJSONLibraries] = useState([]);
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
          description: lib.description,
          website:     lib.homepage
        });
      }

      jsonLibraries.forEach(inserter);
      setDependenciesList(dep_list);
      setLoading(false);
    }
    fetchLibraries();
  }, [jsonLibraries.length]);

  const clearForm = (): void => {
    setValue('name', '');
    setValue('version', '');
    setValue('description', '');
    setValue('dependencies', []);
    setValue('builtinBaseline', '');
    setDependenciesCount(0);
    clearErrors();
  }

  const dependencyPickerOnChange = (values: Dependency[]) => {
    setValue("dependencies", values);
    setDependenciesCount(getValues('dependencies')!.length);
  }

  const onSubmit: SubmitHandler<VCPKGManifest> = (data) => { props.generateFile(data); }

  const removeDependency = (dependency: Dependency) => {
    setValue(
      'dependencies',
      getValues('dependencies')!.filter(dep => dep !== dependency)
    );
    setDependenciesCount(getValues('dependencies')!.length);
  }

  return(
    <Fragment>
      <FetchingBackdrop loading={loading}/>
      <FormItem sx={{ maxWidth: '51em', mx: 'auto' }}>
        {!loading && <Grid component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', mx: 'auto', maxWidth: '50em' }} autoComplete="off">
          <FormItem>
            <Name errors={errors} register={register}/>
          </FormItem>

          <FormItem>
            <Version errors={errors} register={register}/>
          </FormItem>

          <FormItem>
            <Description register={register}/>
          </FormItem>

          {/* <FormItem>
            <BuiltinBaseline builtinBaseline={formData.builtinBaseline} handleChange={handleChange}/>
          </FormItem> */}

          <FormItem>
            <DependencyPicker
              control={control}
              dependenciesList={dependenciesList}
              handleChange={dependencyPickerOnChange}
            />
          </FormItem>

          <FormItem>
            <GenerateFileButton/>
            <ClearForm clearFunc={clearForm}/>
          </FormItem>
        </Grid>}
      </FormItem>

      {dependenciesCount > 0 && <Box>
        <DependenciesSection
          dependencies={getValues('dependencies')!}
          generating={props.generating}
          removeFunc={removeDependency}
        />
      </Box>}
    </Fragment>
  );
}

export default MainForm;
