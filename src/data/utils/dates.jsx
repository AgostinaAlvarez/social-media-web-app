import { format } from "date-fns";

export const postDateTranform = (dateISOString) => {
  const formattedDate = format(new Date(dateISOString), "EEEE, MMM dd, h:mm a");
  return formattedDate;
};
