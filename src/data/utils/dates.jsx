import { format } from "date-fns";

export const postDateTranform = (dateISOString) => {
  const formattedDate = format(new Date(dateISOString), "EEEE, MMM dd, h:mm a");
  return formattedDate;
};

export const ISOStringToHierarchicalDate = (isoDate) => {
  //const isoDate = "2025-02-08T00:14:57.977Z";
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() devuelve 0-11, así que sumamos 1
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;

  return formattedDate;
};
