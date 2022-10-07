import { TextFieldProps, TextField as MuiTextField } from "@mui/material";

type Props = TextFieldProps;

export const TextField = (props: Props) => {
  return (
    <MuiTextField
      {...props}
      size="small"
      helperText={props?.helperText || " "}
      InputLabelProps={{ shrink: true }}
    />
  );
};
