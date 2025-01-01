import { format } from "date-fns";

/*
const inputDate = "2024-10-20T18:09:45.511Z";
const formattedDate = format(new Date(inputDate), "EEEE, MMM dd, h:mm a");

console.log(formattedDate); // Ejemplo: "Sunday, Oct 20, 6:09 pm"
*/
export const postDateTranform = (dateISOString) => {
  const formattedDate = format(new Date(dateISOString), "EEEE, MMM dd, h:mm a");
  console.log(formattedDate);
  return formattedDate;
};
