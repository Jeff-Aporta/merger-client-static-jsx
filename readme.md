# Merger JSX

## Descripción

**Merger JSX** es una herramienta diseñada para combinar múltiples archivos JSX en un solo archivo para aplicaciones web estáticas. Ideal para optimizar el rendimiento de tus proyectos al reducir el número de solicitudes HTTP.

## Instalación

Para instalar la biblioteca, utiliza npm:

```bash
npm install merger-client-static-jsx
```

crear un .babelrc en la raíz con el siguiente contenido

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## Uso

Una vez instalada la biblioteca, puedes utilizarla en tu proyecto de la siguiente manera:

```javascript
//./build.js
import path from 'path';
import { fileURLToPath } from 'url';

import merger from "merger-client-static-jsx";

// Configura __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

merger({
  folderRoot: path.join(__dirname, "public"),
  output: path.join(__dirname, "public", "app.client.merged.min.js"),
});
```

Ejecutas el código en el archivo con el nombre que le hayas puesto.

```bash
node build.js
```

### Parámetros

- **folderRoot**: (string) Ruta de la carpeta raíz que contiene los archivos JSX que deseas combinar. Asegúrate de que la carpeta exista y contenga los archivos necesarios.

- **output**: (string) Ruta del archivo de salida donde se generará el archivo combinado. Puedes especificar el nombre del archivo y la extensión que prefieras.

Usar saas y rollup

instalar

```bash
npm install @rollup/plugin-node-resolve rollup-plugin-terser
```

Crear el rollup.config.js, ejemplo:

```js
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "public/index.mjs",
  output: {
    file: "public/index.all.min.js",
    format: "iife",
    name: "asciiMap",
  },
  plugins: [resolve({ extensions: [".mjs", ".js"] }), terser()],
};
```

Uso de ambas funciones de construcción

```js
//./build.js
import path from "path";
import { fileURLToPath } from "url";

import { merger, build_SASS_rollup } from "merger-client-static-jsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await build_SASS_rollup({
  mainSASS: "./public/theme/scss/abrevs.scss",
  outCSS: "./public/css/main-sass.css",
});

merger({
  folderRoot: path.join(__dirname, "public"),
  output: path.join(__dirname, "public", "app.client.merged.min.js"),
});
```