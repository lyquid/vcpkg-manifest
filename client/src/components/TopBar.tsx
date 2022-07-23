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

          {/* <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="dark" data-type="VERTICAL" data-vanity="alejandro-castillo-blanco-23180523b" data-version="v1"><a className="badge-base__link LI-simple-link" href="https://es.linkedin.com/in/alejandro-castillo-blanco-23180523b?trk=profile-badge">Alejandro Castillo Blanco</a></div> */}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
