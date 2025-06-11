import fs from "fs";
import { Data } from "./types";

export function parseJSON(filePath: string): Data[] {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const dataEntries = JSON.parse(data);
    const dataTransformed: Data[] = dataEntries.map((entry: any) => {
      return {
        name: entry.name,
        email: entry.email,
        dateOfConnection: entry.dateOfConnection,
        age: entry.age,
      };
    });
    return dataTransformed;
  } catch (error: any) {
    throw new Error(`Error reading or parsing JSON file: ${error.message}`);
  }
}
