import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { Masonry } from '@mui/lab';
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
      <Card
        key={dependency.name}
        sx={ theme => ({
          '&:hover': {
            // backgroundColor: theme.palette.background.default,
            transform: "scale3d(1.01, 1.01, 1)"
          }
        })}
      >
        <CardHeader
          subheader={t('dependencies.version') + ': ' + (dependency.version || t('dependencies.version-na'))}
          subheaderTypographyProps={{variant: 'libraryVersion'}}
          title={dependency.name}
          titleTypographyProps={{variant: 'libraryTitle'}}
        />

        <CardContent>
          <Typography paragraph variant='libraryDescription' >
            {dependency.description}
          </Typography>
        </CardContent>

        <DependencyActions dependency={dependency} removeFunc={props.removeFunc} />
      </Card>
    );
  });

  return(
    <Masonry
      columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
      spacing={0.5}
    >
      {dependenciesItems}
    </Masonry>
  );
}
