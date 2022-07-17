import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dependency } from '../types'

interface ListParams {
  dependencies: Dependency[],
  removeFunc:   Function
};

export default function DependenciesList(props: ListParams) {
  const dependenciesList = props.dependencies.map((dependency: Dependency) =>
    <ListItem key={dependency.name} secondaryAction={
      <IconButton aria-label="delete" edge="end" onClick={() => props.removeFunc(dependency)}>
        <DeleteIcon/>
      </IconButton>
    }>
      <ListItemText primary={dependency.name} secondary={"sec text"/* secondary ? 'Secondary text' : null */}/>
      {/* {dependency.library}, {dependency.version || "default version"} */}
    </ListItem>
  );
  return(<List>{dependenciesList}</List>);
}
