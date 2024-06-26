import dayjs, { Dayjs } from "dayjs";

export const validatePesel = (pesel?: string): boolean => {
  if (pesel == null) return false;
  if (pesel.length !== 11) return false;

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const digits = pesel.split("").map(Number);

  const checksum = digits.reduce((sum, digit, index) => {
    if (index < 10) sum += digit * weights[index];
    return sum;
  }, 0);

  const lastDigit = (10 - (checksum % 10)) % 10;

  return lastDigit === digits[10];
};

export const getBirthdayFromPesel = (pesel: string): Dayjs => {
  // Extract parts
  let year = parseInt(pesel.substring(0, 2), 10);
  let month = parseInt(pesel.substring(2, 4), 10);
  let day = parseInt(pesel.substring(4, 6), 10);

  // Adjust year based on month for century
  if (month > 80) {
    year += 1800;
    month -= 80;
  } else if (month > 60) {
    year += 2200;
    month -= 60;
  } else if (month > 40) {
    year += 2100;
    month -= 40;
  } else if (month > 20) {
    year += 2000;
    month -= 20;
  } else {
    year += 1900;
  }

  // Create Dayjs object
  return dayjs(new Date(year, month - 1, day));
};
