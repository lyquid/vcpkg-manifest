import { Alert, AlertTitle } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function GeneratingAlert() {
  const { t } = useTranslation();
  return(
    <Alert severity="warning" variant='standard'>
      <AlertTitle>{t('generatingAlert.working')}</AlertTitle>
      {t('generatingAlert.info')}
    </Alert>
  );
}
