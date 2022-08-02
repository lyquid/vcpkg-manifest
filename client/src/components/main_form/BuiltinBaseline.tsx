import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface BBParams {
  builtinBaseline?: string,
  handleChange:     Function
};

export default function BuiltinBaseline(props: BBParams) {
  return(
    <FormControl sx={{ m: 1, width: '75ch' }}>
      <InputLabel id="builtin-baseline-select-label">Builtin-baseline</InputLabel>
      <Select
        labelId="builtin-baseline-select-label"
        name="builtinBaseline"
        value={props.builtinBaseline}
        label="Builtin-baseline"
        onChange={(event) => {props.handleChange(event)}}
      >
        <MenuItem value={"b60f003ccf5fe8613d029f49f835c8929a66eb61"}>b60f003ccf5fe8613d029f49f835c8929a66eb61</MenuItem>
        <MenuItem value={"a14a6bcb27287e3ec138dba1b948a0cdbc337a3a"}>a14a6bcb27287e3ec138dba1b948a0cdbc337a3a</MenuItem>
      </Select>
    </FormControl>
  );
}
