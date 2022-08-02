import { ClearAll } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ClearParams {
  clearFunc: Function
};

export default function ClearForm(props: ClearParams) {
  const { t } = useTranslation();
  return(
    <Button
      variant="contained"
      color="error"
      onClick={() => props.clearFunc()}
    >
      <ClearAll/>
      {t('mainForm.clear-form')}
    </Button>
  );
}
