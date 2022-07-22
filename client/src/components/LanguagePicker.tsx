import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Tooltip, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

export default function LanguagePicker() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const languages = {
    ca: { native_name: 'Català' },
    de: { native_name: 'Deutsch' },
    en: { native_name: 'English' },
    es: { native_name: 'Español' }
  };

  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const handleLangChange = (lang: string) => {
    i18n.changeLanguage(lang);
    handleCloseLangMenu();
  }

  return(
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={t('topBar.languages')}>
        <IconButton onClick={handleOpenLangMenu} sx={{ p: 0 }}>
          <LanguageIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <LanguageIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElLang}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElLang)}
        onClose={handleCloseLangMenu}
      >
        {Object.keys(languages).sort().map((lang) => (
          <MenuItem key={lang} onClick={() => handleLangChange(lang)}>
            <Typography textAlign="center">{languages[lang as keyof typeof languages].native_name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
