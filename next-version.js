import { promises as fs } from "fs";

export default readJsonFile;

async function readJsonFile(filePath = "./package.json", max2 = 12, max3 = 12) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);
    const json = jsonData;
    let [n1, n2, n3] = jsonData.version.split(".");
    n3++;
    if (n3 > max3) {
      n3 = 0;
      n2++;
    }
    if (n2 > max2) {
      n2 = 0;
      n1++;
    }
    json.version = [n1, n2, n3].join(".");
    await fs.writeFile("./package.json", JSON.stringify(json, null, 2));
  } catch (error) {
    console.error("Error al leer el archivo:", error);
  }
}
