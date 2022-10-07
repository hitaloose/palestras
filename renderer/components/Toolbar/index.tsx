import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Divider, Input, Box } from "@mui/material";

type Props = {
  onSearchValueChange?: (value: string) => void;
};

export const Toolbar = ({ onSearchValueChange }: Props) => {
  const [value, setValue] = useState("");

  const handleChangeValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (onSearchValueChange) {
        onSearchValueChange(value);
      }
    },
    [value]
  );

  return (
    <>
      <Box component="form" padding={1} onSubmit={handleSubmit}>
        <Input
          fullWidth
          disableUnderline
          placeholder="Pesquisar..."
          value={value}
          onChange={handleChangeValue}
        />
      </Box>
      <Divider />
    </>
  );
};
