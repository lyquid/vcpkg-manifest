import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface VersionParams {
  register: Function
};

export default function Version(props: VersionParams) {
  const { t } = useTranslation();
  return(
    <TextField
      {...props.register("version")}
      label={t('mainForm.version')}
      name="version"
      fullWidth
    />
  );
}
