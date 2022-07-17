import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface VersionParams {
  version:      string,
  handleChange: Function
};

export default function Version(props: VersionParams) {
  const { t } = useTranslation();
  return(
    <TextField
      label={t('mainForm.version')}
      name="version"
      onChange={(event) => props.handleChange(event)}
      value={props.version}
    />
  );
}
