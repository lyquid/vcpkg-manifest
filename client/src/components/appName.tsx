import { TextField } from "@mui/material";

interface AppNameParams {
  appName:      string,
  handleChange: Function
};

export default function AppName(props: AppNameParams) {
  return(
    <TextField
      label="App name"
      name="name"
      onChange={(event) => props.handleChange(event)}
      value={props.appName}
    />
  );
}
