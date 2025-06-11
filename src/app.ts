import { parseJSON } from "./jsonParser";
import { Data } from "./types";
import { validateData } from "./validator";

const dataFilePath = process.argv[2];

if (!dataFilePath) {
  console.error("Veuillez fournir le chemin du fichier de données à valider.");
  process.exit(1);
}

let dataEntries: Data[];

try {
  dataEntries = parseJSON(dataFilePath);
} catch (error: any) {
  console.error(`Erreur lors de la lecture du fichier: ${error.message}`);
  process.exit(1);
}

let count = 1;
const listErrors: Record<string, string[]> = {};

dataEntries.forEach((entry) => {
  const error: string[] = [];

  if (!validateData(entry.name, "string")) {
    error.push("Nom invalide");
  }
  if (!validateData(entry.email, "email")) {
    error.push("Email invalide");
  }
  if (!validateData(entry.dateOfConnection, "date")) {
    error.push("Date invalide");
  }
  if (!validateData(entry.age, "numberPositive")) {
    error.push("Âge invalide");
  }

  if (error.length > 0) {
    listErrors[`data_${count}`] = error;
  }

  count++;
});

console.log(`Nombre total d'entrées: ${dataEntries.length}`);
console.log(`Nombre d'entrées avec erreurs: ${Object.keys(listErrors).length}`);
console.log("Liste des erreurs:");
console.log("====================================");
console.log(listErrors);
console.log("====================================");
