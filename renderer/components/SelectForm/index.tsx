import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

type Props = Omit<AutocompleteProps<any, any, any, any>, "renderInput"> & {
  name: string;
  control: any;
  label?: string;
};

export const SelectForm = ({ name, control, ...props }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          {...props}
          onChange={(e, value) => {
            field.onChange(value);
          }}
          value={field.value}
          size="small"
          renderInput={(params) => (
            <TextField
              {...field}
              {...params}
              size="small"
              error={!!error}
              helperText={error?.message || " "}
              InputLabelProps={{ shrink: true }}
              label={props.label}
            />
          )}
        />
      )}
    />
  );
};
