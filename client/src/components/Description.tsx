import { TextField } from "@mui/material";

interface DescriptionParams {
  description?: string,
  handleChange: Function
};

export default function AppDescription(props: DescriptionParams) {
  return(
    <TextField
      label="Description"
      minRows="2"
      multiline
      name="description"
      onChange={(event) => props.handleChange(event)}
      value={props.description}
    />
  );
}
