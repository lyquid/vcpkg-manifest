import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function GeneratingAlert() {
  const { t } = useTranslation();
  return(
    <Alert severity="info" variant='standard'>{t('mainForm.generating-alert')}</Alert>
  );
}
