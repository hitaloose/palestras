import { format, isValid } from "date-fns";

export const dateToString = (date: Date) => {
  if (!date) return "";

  if (!isValid(date)) return "";

  return format(date, "dd/MM/yyyy");
};
