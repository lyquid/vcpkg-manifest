import { Button, Fab } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useMediaQuery } from 'react-responsive' // https://www.npmjs.com/package/react-responsive
import { useTranslation } from 'react-i18next';

export default function GenerateFileButton() {
  const { t } = useTranslation();
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  if (isPortrait) {
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
    );
  } else {
    return(
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        <DownloadIcon/>
        {t('mainForm.generate-json')}
      </Button>
    );
  }
}
