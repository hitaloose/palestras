import { TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";

type Props = {
  name: string;
  control: any;
} & TextFieldProps;

export const TextFieldForm = ({ control, name, ...props }: Props) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        {...props}
        size="small"
        error={!!error}
        helperText={error?.message || " "}
        InputLabelProps={{ shrink: true }}
      />
    )}
  />
);
