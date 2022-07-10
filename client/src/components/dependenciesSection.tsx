import { Box } from "@mui/material";
import { Dependency } from '../types'
import DependenciesList from "./dependenciesList";

interface DependenciesSectionParams {
  dependencies: Dependency[],
  generating:   boolean,
  removeFunc:   Function
};

export default function DependenciesSection(props: DependenciesSectionParams) {
  return(
    <Box>
      <fieldset disabled={props.generating}>
        <div>
          <DependenciesList dependencies={props.dependencies} removeFunc={props.removeFunc}/>
        </div>
      </fieldset>
    </Box>
  );
}
