import { GitHub } from "@mui/icons-material";
import { Typography } from "@mui/material";

export default function GitHubIcon() {
  return(
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
  );
}
