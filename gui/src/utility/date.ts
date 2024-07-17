import { Dayjs } from "dayjs";

export const formatDateTime = (date: Dayjs) => date.format("DD MMM YYYY HH:mm");
export const formatDate = (date: Dayjs) => date.format("DD MMM YYYY");
export const formatCompressedDateTime = (date: Dayjs) =>
  date.format("DD-MM-YYYY-HH-mm");
