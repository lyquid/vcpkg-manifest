import { AppBar, Toolbar, Box } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import LanguagePicker from './LanguagePicker';
import { Logo } from './Logo';

export default function TopBar() {
  return (
    <AppBar position="sticky">
      <Box sx={{ display: 'flex', mx: 'auto' }}>
        <Toolbar disableGutters>

          <TerminalIcon sx={{ display: 'flex', mr: 1 }} />
          <Logo/>
          <LanguagePicker/>

        </Toolbar>
      </Box>
    </AppBar>
  );
}
