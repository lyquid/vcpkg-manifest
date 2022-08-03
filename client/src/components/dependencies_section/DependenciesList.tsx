import { ListItem, ListItemText, IconButton, Paper, styled } from '@mui/material';
import { Masonry } from '@mui/lab';
import ClearIcon from '@mui/icons-material/Clear';
import { Dependency } from '../../types'


interface ListParams {
  dependencies: Dependency[],
  removeFunc:   Function
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'justify',
  color: theme.palette.text.secondary,
}));

export default function DependenciesList(props: ListParams) {
  const dependenciesItems = props.dependencies.map((dependency: Dependency) =>
    <Item key={dependency.name}>
      <ListItem key={dependency.name} secondaryAction={
        <IconButton aria-label="delete" edge="end" onClick={() => props.removeFunc(dependency)}>
          <ClearIcon/>
        </IconButton>
      }>
        <ListItemText primary={dependency.name} secondary={dependency.description}/>
      </ListItem>
    </Item>
  );
  return(
    <Masonry
      columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4}}
      spacing={1}
    >
      {dependenciesItems}
    </Masonry>
  );
}
