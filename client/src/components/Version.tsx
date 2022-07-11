import { TextField } from "@mui/material";

interface VersionParams {
  version:      string,
  handleChange: Function
};

export default function Version(props: VersionParams) {
  return(
    <TextField
      label="Version"
      name="version"
      onChange={(event) => props.handleChange(event)}
      value={props.version}
    />
  );
}
