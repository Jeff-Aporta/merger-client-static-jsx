import path from 'path'
import fs from 'fs'
import CleanCSS from 'clean-css';

export default cssMerger;

function cssMerger({ outfile, folderCSS }) {
    const files = fs.readdirSync(folderCSS);
    let combinedCSS = '';
    files.forEach((file) => {
        if (path.extname(file) === '.css') {
            const filePath = path.join(folderCSS, file);
            combinedCSS += fs.readFileSync(filePath, 'utf-8') + '\n';
        }
    });
    const minifiedCSS = new CleanCSS().minify(combinedCSS).styles;
    fs.writeFileSync(outfile, minifiedCSS);
    console.log('CSS combinado y minificado con éxito.');
}