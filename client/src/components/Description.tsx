import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DescriptionParams {
  register: Function
};

export default function AppDescription(props: DescriptionParams) {
  const { t } = useTranslation();
  return(
    <TextField
      {...props.register("description")}
      label={t('mainForm.description')}
      minRows="2"
      multiline
      name="description"
      fullWidth
    />
  );
}
