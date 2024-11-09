import { merger, next_version, cssMerger } from "./merger.js";
import path from "path";

merger({
  folderRoot: "public",
  output: path.join("public", "app.client.merged.min.js"),
});

// cssMerger({
//   outfile: "./public/static/all.css",
//   folderCSS: "./public/css",
// })

// next_version()