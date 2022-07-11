import { TextField } from "@mui/material";

interface NameParams {
  name:         string,
  handleChange: Function
};

export default function Name(props: NameParams) {
  return(
    <TextField
      label="App name"
      name="name"
      onChange={(event) => props.handleChange(event)}
      value={props.name}
    />
  );
}
