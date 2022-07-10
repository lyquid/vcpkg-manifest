import { TextField } from "@mui/material";

interface AppVersionParams {
  appVersion:   string,
  handleChange: Function
};

export default function AppVersion(props: AppVersionParams) {
  return(
    <TextField
      label="Version"
      name="version"
      onChange={(event) => props.handleChange(event)}
      value={props.appVersion}
    />
  );
}
