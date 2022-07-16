import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DescriptionParams {
  description?: string,
  handleChange: Function
};

export default function AppDescription(props: DescriptionParams) {
  const { t } = useTranslation();
  return(
    <TextField
      label={t('mainForm.description')}
      minRows="2"
      multiline
      name="description"
      onChange={(event) => props.handleChange(event)}
      value={props.description}
    />
  );
}
