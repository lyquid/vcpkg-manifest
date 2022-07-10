import { Button } from '@mui/material';

interface ClearParams {
  clearFunc: Function
};

export default function ClearForm(props: ClearParams) {
  return(
    <Button
      variant="contained"
      color="error"
      onClick={() => props.clearFunc()}
    >
      Clear fields
    </Button>
  )
}
