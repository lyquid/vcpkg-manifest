import { AppBar, Container, Toolbar, Box } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import LanguagePicker from './LanguagePicker';
import { Logo, LogoSlim } from './Logo';

export default function TopBar() {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <TerminalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Logo/>

          <TerminalIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <LogoSlim/>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}/>

          <LanguagePicker/>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
