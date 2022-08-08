import { AppBar, Toolbar, Box } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import LanguagePicker from './LanguagePicker';
import { Logo } from './Logo';
import GitHubIcon from './GitHubIcon';
import ThemeSwitch from './ThemeSwitch';

export default function TopBar() {
  return(
    <AppBar position="static">
      <Box sx={{ display: 'flex', mx: 'auto' }}>
        <Toolbar disableGutters>

          <TerminalIcon sx={{ display: 'flex', mr: 1 }} />
          <Logo/>
          <GitHubIcon/>
          <LanguagePicker/>
          <ThemeSwitch/>

        </Toolbar>
      </Box>
    </AppBar>
  );
}
