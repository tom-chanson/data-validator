import { DataType } from "./types";

export function validateDate(dateString: string): boolean {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
  if (!datePattern.test(dateString)) {
    return false;
  }

  const date = new Date(dateString);
  const timestamp = date.getTime();
  if (isNaN(timestamp)) {
    return false;
  }
  return true;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return validateString(email) && emailRegex.test(email);
}

export function validateNumber(value: any): boolean {
  return typeof value === "number";
}

export function validateNumberPositive(value: any): boolean {
  return validateNumber(value) && value >= 0;
}

export function validateString(value: any): boolean {
  return Boolean(typeof value === "string" && value);
}

export function validateData(data: any, dataType: DataType): boolean {
  switch (dataType) {
    case "number":
      return validateNumber(data);
    case "string":
      return validateString(data);
    case "numberPositive":
      return validateNumberPositive(data);
    case "date":
      return validateDate(data);
    case "email":
      return validateEmail(data);
    default:
      throw new Error(`Type de données non pris en charge: ${dataType}`);
  }
}
