import { TextField } from "@mui/material";
import { FieldErrorsImpl, DeepRequired } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { VCPKGManifest } from "../../types";

interface VersionParams {
  errors: FieldErrorsImpl<DeepRequired<VCPKGManifest>>,
  register: Function
};

export default function Version(props: VersionParams) {
  const { t } = useTranslation();

  const helperText = (): string | undefined => {
    if (props.errors.version?.type === 'required') {
      return t('formErrors.version-required');
    }
    return;
  }

  return(
    <TextField
      {...props.register("version", { required: true })}
      error={props.errors.version !== undefined}
      fullWidth
      helperText={helperText()}
      label={t('mainForm.version')}
      name="version"
    />
  );
}
