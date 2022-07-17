import { Button } from '@mui/material';
import { useTranslation } from "react-i18next";

interface GenerateParams {
  generateFunc: Function
};

export default function GenerateFileButton(props: GenerateParams) {
  const { t } = useTranslation();
  return(
    <Button
      variant="contained"
      color="primary"
      onClick={() => props.generateFunc()}
    >
      {t('mainForm.generate-file')}
    </Button>
  )
}
