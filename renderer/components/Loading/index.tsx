import { Backdrop, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Backdrop open style={{ zIndex: 1201 }}>
      <CircularProgress />
    </Backdrop>
  );
};
