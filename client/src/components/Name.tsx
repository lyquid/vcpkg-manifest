import { TextField } from "@mui/material";
import { FieldErrorsImpl, DeepRequired } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { VCPKGManifest } from "../types";

interface NameParams {
  errors: FieldErrorsImpl<DeepRequired<VCPKGManifest>>,
  register: Function
};

export default function Name(props: NameParams) {
  const { t } = useTranslation();

  const helperText = (): string | undefined => {
    if (props.errors.name?.type === 'required') {
      return t('formErrors.name-required');
    }
    if (props.errors.name?.type === 'pattern') {
      return t('formErrors.name-pattern');
    }
    return;
  }

  return(
    <TextField
      {...props.register("name", { required: true, pattern: /^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)*$/ })}
      error={props.errors.name !== undefined}
      fullWidth
      helperText={helperText()}
      label={t('mainForm.app-name')}
      name="name"
    />
  );
}
