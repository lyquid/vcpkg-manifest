import { CardActions, Tooltip, IconButton } from '@mui/material';
import { OpenInNew, GitHub, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Dependency } from '../../types';

interface DependenciesActionsParams {
  dependency: Dependency,
  removeFunc: Function
};

export default function DependencyActions(props: DependenciesActionsParams) {
  const { t } = useTranslation();

  const isGitHubUrl = () => {
    if (props.dependency.website === undefined) {
      return false;
    }
    return props.dependency.website.includes('github.com') ? true : false;
  }

  const gitHubUrl = isGitHubUrl();

  return(
    <CardActions disableSpacing>
      {props.dependency.website && <Tooltip title={t('dependencies.visit-website')}>
        <IconButton
          aria-label="visit website"
          disabled={props.dependency.website === undefined}
          href={props.dependency.website!}
          rel="noopener"
          target="_blank"
        >
          {!gitHubUrl && <OpenInNew/>}
          { gitHubUrl && <GitHub/>}
        </IconButton>
      </Tooltip>}

      {!props.dependency.website && <IconButton disabled>
        <OpenInNew/>
      </IconButton>}

      <Tooltip title={t('dependencies.remove')}>
        <IconButton
          aria-label="remove dependency"
          onClick={() => props.removeFunc(props.dependency)}
          sx={{marginLeft: 'auto'}}
        >
          <Delete/>
        </IconButton>
      </Tooltip>
    </CardActions>
  );
}
