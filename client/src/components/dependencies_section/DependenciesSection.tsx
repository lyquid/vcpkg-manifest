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
      <DependenciesList
        dependencies={props.dependencies}
        removeFunc={props.removeFunc}
      />
    </Box>
  );
}
