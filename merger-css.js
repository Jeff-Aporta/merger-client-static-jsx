import path from 'path'
import fs from 'fs'

export default cssMerger;

function cssMerger({ outfile, folderCSS }) {
    fs.writeFileSync(outfile, getAllCssFiles(folderCSS));
    console.log('CSS combinado y minificado con éxito.');
}

function getAllCssFiles(dir, acc = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        const content = fs.readFileSync(fullPath, "utf-8");
        if (stat.isDirectory()) {
            getAllJsxFiles(fullPath, acc);
        } else if (file.endsWith(".css")) {
            acc.push(content);
        }
    });

    return acc.join("\n").replace(/\/\*[\s\S]*?\*\//g, ' ').replaceAll("\n", " ").replace(/\s+/g, " ").replaceAll(" 0.", " .").replaceAll(" }", "}").replaceAll("{ ", "{").replaceAll("; ", ";")
}