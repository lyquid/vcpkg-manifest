import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ColorModeContext } from '../../App';

export default function ThemeSwitch() {
  const { t } = useTranslation();
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  return(
    <Tooltip title={theme.palette.mode === 'dark' ? t('topBar.light-theme') : t('topBar.dark-theme')}>
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? <LightModeIcon/> : <DarkModeIcon/>}
      </IconButton>
    </Tooltip>
  );
}
