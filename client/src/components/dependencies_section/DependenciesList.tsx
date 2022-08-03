import { IconButton, Card, CardHeader, CardContent, Typography, CardActions } from '@mui/material';
import { Masonry } from '@mui/lab';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { Dependency } from '../../types'

interface ListParams {
  dependencies: Dependency[],
  removeFunc:   Function
};

export default function DependenciesList(props: ListParams) {
  const { t } = useTranslation();

  const dependenciesItems = props.dependencies.map((dependency: Dependency) =>
    <Card key={dependency.name}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="options">
            <MoreVertIcon />
          </IconButton>
        }
        title={dependency.name}
        subheader={t('dependencies.version') + ': ' + (dependency.version || t('dependencies.versionNA'))}
      />

      <CardContent>
        <Typography color="text.secondary" paragraph variant="body2">
          {dependency.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          aria-label="visit website"
          disabled={dependency.website === undefined}
          href={dependency.website!}
          rel="noopener"
          target="_blank"
        >
          <OpenInNewIcon/>
        </IconButton>

        <IconButton
          aria-label="remove dependency"
          onClick={() => props.removeFunc(dependency)}
          sx={{marginLeft: 'auto'}}
        >
          <DeleteIcon/>
        </IconButton>

      </CardActions>
    </Card>
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
