# Merger JSX

## Descripción

**Merger JSX** es una herramienta diseñada para combinar múltiples archivos JSX en un solo archivo para aplicaciones web estáticas. Ideal para optimizar el rendimiento de tus proyectos al reducir el número de solicitudes HTTP.

## Instalación

Para instalar la biblioteca, utiliza npm:

```bash
npm install merger-client-static-jsx
```

## Uso

Una vez instalada la biblioteca, puedes utilizarla en tu proyecto de la siguiente manera:

```javascript
import merger from "./index.js";

// Configura el mergeador
merger({
  folderRoot: "test", // Ruta de la carpeta raíz que contiene los archivos JSX estáticos.
  output: "test/app.client.merged.min.js", // Archivo de salida donde se guardará el resultado.
});
```

### Parámetros

- **folderRoot**: (string) Ruta de la carpeta raíz que contiene los archivos JSX que deseas combinar. Asegúrate de que la carpeta exista y contenga los archivos necesarios.

- **output**: (string) Ruta del archivo de salida donde se generará el archivo combinado. Puedes especificar el nombre del archivo y la extensión que prefieras.