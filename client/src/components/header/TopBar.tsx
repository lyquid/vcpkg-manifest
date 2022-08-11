import { AppBar, Toolbar, Box, Slide, useScrollTrigger } from '@mui/material';
import LanguagePicker from './LanguagePicker';
import { Logo } from './Logo';
import GitHubIcon from './GitHubIcon';
import ThemeSwitch from './ThemeSwitch';

export default function TopBar() {
  const trigger = useScrollTrigger();
  return(
    <Slide appear={false} direction='down' in={!trigger}>
      <AppBar position='sticky'>
        <Box sx={{ display: 'flex', mx: 'auto' }}>
          <Toolbar disableGutters>
            <Logo/>
            <GitHubIcon/>
            <LanguagePicker/>
            <ThemeSwitch/>
          </Toolbar>
        </Box>
      </AppBar>
    </Slide>
  );
}
