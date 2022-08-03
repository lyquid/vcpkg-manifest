import { useTranslation } from 'react-i18next';
import { GitHub } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";

export default function GitHubIcon() {
  const { t } = useTranslation();
  return(
    <Tooltip title={t('topBar.github')}>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="https://github.com/lyquid/vcpkg-manifest"
        sx={{
          mr: 2,
          display: 'flex',
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none'
        }}
      >
        <GitHub/>
      </Typography>
    </Tooltip>
  );
}
