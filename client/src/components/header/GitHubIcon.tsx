import { useTranslation } from 'react-i18next';
import { GitHub } from '@mui/icons-material';
import { Tooltip, Typography } from '@mui/material';

export default function GitHubIcon() {
  const { t } = useTranslation();
  return(
    <Tooltip title={t('topBar.github')}>
      <Typography
        component='a'
        href='https://github.com/lyquid/vcpkg-manifest'
        sx={{
          mr: 2,
          display: 'flex',
          color: 'inherit',
        }}
      >
        <GitHub/>
      </Typography>
    </Tooltip>
  );
}
