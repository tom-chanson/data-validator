export type DataType =
  | "number"
  | "string"
  | "numberPositive"
  | "date"
  | "email";

export interface Data {
  name: string;
  email: string;
  dateOfConnection: string;
  age: number;
}
