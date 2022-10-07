import { Paper } from "@mui/material";
import { ReactElement } from "react";

type Props = {
  children: ReactElement | string;
};

export const PageContainer = ({ children }: Props) => {
  return (
    <Paper sx={{ height: "calc(100% - 80px)", padding: 1 }}>{children}</Paper>
  );
};
