import { Box } from "@mui/material";
import { Dependency } from '../../types'
import DependenciesList from "./DependenciesList";

interface DependenciesSectionParams {
  dependencies: Dependency[],
  generating:   boolean,
  removeFunc:   Function
};

export default function DependenciesSection(props: DependenciesSectionParams) {
  return(
    <Box sx={{ mx: 'auto', maxWidth: '120em' }}>
      <fieldset disabled={props.generating}>
        <DependenciesList
          dependencies={props.dependencies}
          removeFunc={props.removeFunc}
        />
      </fieldset>
    </Box>
  );
}
