import { Button, Fab } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next';

export default function GenerateFileButton() {
  const { t } = useTranslation();
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  if (isPortrait) {
    return(
      <Fab
        aria-label="download file"
        color='primary'
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(2),
          left: (theme) => theme.spacing(2)
        }}
        type='submit'
      >
        <DownloadIcon/>
      </Fab>
    );
  } else {
    return(
      <Button
        color='primary'
        type='submit'
        variant='contained'
      >
        <DownloadIcon/>
        {t('mainForm.generate-json')}
      </Button>
    );
  }
}
