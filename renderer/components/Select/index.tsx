import { Autocomplete, AutocompleteProps } from "@mui/material";
import { TextField } from "../TextField";

type Props = Omit<AutocompleteProps<any, any, any, any>, "renderInput"> & {
  label?: string;
};

export const Select = (props: Props) => {
  return (
    <Autocomplete
      {...props}
      size="small"
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
};
