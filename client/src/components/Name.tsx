import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface NameParams {
  name:         string,
  handleChange: Function
};

export default function Name(props: NameParams) {
  const { t } = useTranslation();
  return(
    <TextField
      label={t('mainForm.app-name')}
      name="name"
      onChange={(event) => props.handleChange(event)}
      value={props.name}
    />
  );
}
