import { Button } from '@mui/material';

interface GenerateParams {
  generateFunc: Function
};

export default function GenerateJSONButton(props: GenerateParams) {
  return(
    <Button
      variant="contained"
      color="primary"
      onClick={() => props.generateFunc()}
    >
      Generate vcpkg.json
    </Button>
  )
}
