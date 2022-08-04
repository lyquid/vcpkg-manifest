import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { Masonry } from '@mui/lab';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from 'react-i18next';
import { compareDependencies, Dependency } from '../../types'
import DependencyActions from './DependencyActions';

interface ListParams {
  dependencies: Dependency[],
  removeFunc:   Function
};

export default function DependenciesList(props: ListParams) {
  const { t } = useTranslation();

  const dependenciesItems = props.dependencies.sort(compareDependencies).map((dependency: Dependency) => {
    return(
      <Card key={dependency.name}>
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          //     R
          //   </Avatar>
          // }
          // action={
          //   <IconButton aria-label="options">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={dependency.name}
          subheader={t('dependencies.version') + ': ' + (dependency.version || t('dependencies.version-na'))}
        />

        <CardContent>
          <Typography color="text.secondary" paragraph variant="body2">
            {dependency.description}
          </Typography>
        </CardContent>

        <DependencyActions dependency={dependency} removeFunc={props.removeFunc} />
      </Card>
    );
  });

  return(
    <Masonry
      columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
      spacing={1}
    >
      {dependenciesItems}
    </Masonry>
  );
}
