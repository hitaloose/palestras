import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import adapterLocale from "date-fns/locale/pt-BR";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";
import { TextField } from "../TextField";

type Props = Omit<
  DatePickerProps<any, any>,
  "onChange" | "value" | "renderInput"
> & {
  name: string;
  control: any;
  fullWidth?: boolean;
};

export const DateFieldForm = ({
  control,
  name,
  fullWidth,
  ...props
}: Props) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={adapterLocale}
    >
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            {...props}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth={fullWidth}
                error={!!error}
                helperText={error?.message || " "}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
};
