import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface NameParams {
  register: Function
};

export default function Name(props: NameParams) {
  const { t } = useTranslation();
  return(
    <TextField
      {...props.register("name")}
      label={t('mainForm.app-name')}
      name="name"
      fullWidth
    />
  );
}
