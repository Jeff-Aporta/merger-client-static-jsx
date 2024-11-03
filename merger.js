import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import * as Terser from "terser";
import next_version from "./next-version.js";
import cssMerger from "./merger-css.js"

export { merger, build_SASS, build_SASS_rollup, build_rollup, next_version, cssMerger };

async function build_rollup() {
  const execPromise = promisify(exec);
  try {
    await execPromise(`rollup -c`);
    console.log("rollup ejecutado con éxito:");
  } catch (error) {
    console.error("Errores durante la construcción del rollup:", error);
  }
}

async function build_SASS({ mainSASS, outCSS }) {
  const execPromise = promisify(exec);
  try {
    await execPromise(
      `sass --no-source-map --style compressed ${mainSASS}:${outCSS}`
    );
    console.log("SASS construido con éxito:");
  } catch (error) {
    console.error("Errores durante la construcción del sass:", error);
  }
}

async function build_SASS_rollup({ mainSASS, outCSS }) {
  build_SASS({ mainSASS, outCSS })
  build_rollup();
}

function merger({ folderRoot, output }) {
  const id = "temp";
  eliminarArchivoDeSalidaSiExiste();
  mergeJsxFiles({
    inputDir: folderRoot,
    outputFile: path.join(folderRoot, `app.merged.${id}.jsx`),
  });
  transpileJSXinJS({
    appMergedJSX: path.join(folderRoot, `app.merged.${id}.jsx`),
    AppMergedJS: path.join(folderRoot, `app.merged.${id}.js`),
    output,
  });
}

function eliminarArchivoDeSalidaSiExiste() {
  try {
    fs.unlinkSync(outputFile);
  } catch (e) { }
}

// Función recursiva para obtener todos los archivos .jsx
function getAllJsxFiles(dir) {
  let jsxFiles = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Si es un directorio, llama recursivamente
      jsxFiles = jsxFiles.concat(getAllJsxFiles(fullPath));
    } else if (file.endsWith(".jsx") && !file.endsWith(".temp")) {
      // Si es un archivo .jsx, lo agrega a la lista
      jsxFiles.push(fullPath);
    }
  });

  return jsxFiles;
}

// Combina el contenido de cada archivo en el archivo de salida
function mergeJsxFiles({ inputDir, outputFile }) {
  const jsxFiles = getAllJsxFiles(inputDir).sort((a, b) => {
    const name_a = a.split(path.sep).pop();
    const name_b = b.split(path.sep).pop();
    return name_a.toLowerCase().localeCompare(name_b.toLowerCase());
  });

  let mergedContent = "";

  jsxFiles.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");
    mergedContent += content + "\n";
  });

  // Escribe el contenido combinado en el archivo final
  fs.writeFileSync(outputFile, mergedContent, "utf-8");
  console.log("Archivos concatenados en", outputFile);
}

// Ejecuta la función de combinación
function transpileJSXinJS({ appMergedJSX, AppMergedJS, output }) {
  if (!appMergedJSX) {
    throw new Error("No hay ruta para transpilar");
  }
  const execPromise = promisify(exec);

  async function transpile() {
    try {
      // Ejecutamos el comando de Babel
      const { stdout, stderr } = await execPromise(
        `npx babel ${appMergedJSX} --out-file ${AppMergedJS}`
      );
      console.log("Transpilación completada con éxito:");
      console.log(stdout); // Salida del comando
      if (stderr) {
        console.error("Errores durante la transpilación:", stderr);
      }
      setTimeout(() => {
        fs.unlinkSync(appMergedJSX);
        jsmerged2min({
          inputFile: AppMergedJS,
          outputFile: output,
        });
      }, 1000);
    } catch (error) {
      // Manejo de errores
      try {
        fs.unlinkSync(appMergedJSX);
      } catch (e) { }
      console.error("Error durante la transpilación:", error);
    }
  }
  // Llamamos a la función
  transpile();
}

function jsmerged2min({ inputFile, outputFile }) {
  fs.readFile(inputFile, "utf-8", async (err, data) => {
    if (err) throw err;
    try {
      const minified = await Terser.minify(data);
      fs.writeFileSync(outputFile, minified.code, "utf-8");
      fs.unlinkSync(inputFile);
    } catch (minifyError) {
      try {
        fs.unlinkSync(inputFile);
      } catch (e) { }
      console.error("Error durante la minificación:", minifyError);
    }
  });
}
