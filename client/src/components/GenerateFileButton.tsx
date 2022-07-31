import { Fab } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

interface GenerateParams {
  generateFunc: Function
};

export default function GenerateFileButton() {
  return(
    <Fab
      type="submit"
      sx={{
        position: "fixed",
        bottom: (theme) => theme.spacing(2),
        right: (theme) => theme.spacing(2)
      }}
      color="primary"
      aria-label="download file"
    >
      <DownloadIcon/>
    </Fab>
  )
}
