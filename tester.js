import merger from "./merger.js";
import path from "path";

merger({
  folderRoot: "public",
  output: path.join("public", "app.client.merged.min.js"),
});
