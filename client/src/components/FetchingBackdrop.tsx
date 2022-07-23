import { Box, Backdrop, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

interface FetchingBackdropParams {
  loading: boolean
};

export default function FetchingBackdrop(props: FetchingBackdropParams) {
  const { t } = useTranslation();
  return(
    <Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.loading}
      >
        <CircularProgress color="inherit"/>
        {t('mainForm.fetching-data')}
      </Backdrop>
    </Box>
  );
}
