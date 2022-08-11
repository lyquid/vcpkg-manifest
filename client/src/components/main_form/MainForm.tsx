import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Grid, Paper, styled } from '@mui/material';
import { compareDependencies, Dependency, VCPKGManifest } from '../../types'
// import BuiltinBaseline from './BuiltinBaseline';
import ClearForm from './ClearForm';
import DependenciesList from '../dependencies_section/DependenciesList';
import DependencyPicker from './DependencyPicker';
import Description from './Description';
import FetchingBackdrop from '../FetchingBackdrop';
import GenerateFileButton from './GenerateFileButton';
import Name from './Name'
import ScrollTop from '../ScrollTop';
import Version from './Version';

interface MainFormParams {
  generateFile: Function,
  generating:   boolean
};

const FormItem = styled(Paper)(({ theme }) => ({
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
      setDependenciesList(dep_list.sort(compareDependencies));
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
    setValue('dependencies', values);
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
      <div id='back-to-top-anchor'></div>
      <FetchingBackdrop loading={loading}/>
      <Grid container /* big container for form and deps */
        // border={4}
        // borderColor='pink'
        columns={12}
        columnSpacing={1}
        rowSpacing={2}
      >
        {!loading &&
        <Grid item /* left container for the form */
          autoComplete='off'
          // border={4}
          // borderColor='red'
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          width='35em'
        >
          <FormItem> {/* big paper for the form */}
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
          </FormItem>
        </Grid>} {/* end left container for the form */}

        {dependenciesCount > 0 &&
        <Grid item /* right container for the dependencies */
          // border={4}
          // borderColor='blue'
          width='75em'
          xs={true}
        >
          <DependenciesList
            dependencies={getValues('dependencies')!}
            removeFunc={removeDependency}
          />
        </Grid>} {/* end right container for the dependencies */}
      </Grid> {/* end big container */}
      <ScrollTop/>
    </Fragment>
  );
}

export default MainForm;
