import { TextField } from "@mui/material";

interface AppDescriptionParams {
  appDescription?: string,
  handleChange:    Function
};

export default function AppDescription(props: AppDescriptionParams) {
  return(
    <TextField
      label="Description"
      minRows="2"
      multiline
      name="description"
      onChange={(event) => props.handleChange(event)}
      value={props.appDescription}
    />
  );
}
