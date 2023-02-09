/*
  Bundle components for AEM
 */

import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';
import { readFile, readdir, writeFile } from 'fs/promises';
import * as esbuild from 'esbuild';
import handlebars from 'handlebars';

const currDir = dirname(fileURLToPath(import.meta.url));
const componentsDir = resolve(currDir, '../', 'src', 'components');
const buildDir = resolve(currDir, '../', 'dist');

const createMarkup = async (componentDir) => {
  const srcTemplate = await readFile(join(componentsDir, componentDir, 'template.hbs'), 'utf-8');
  const compiledTemplate = handlebars.compile(srcTemplate);
  const writePath = join(buildDir, componentDir, 'temlplate.html');
  await writeFile(writePath, compiledTemplate({ artist: 'Beatles' }), { flag: 'w' });
}
 


const buildComponents = async() => {

  const components = await readdir(componentsDir);

  components.forEach((componentDir) => {

    // create output directory
    const outputDir = resolve(currDir, '../', 'dist', componentDir);
    mkdirSync(outputDir, { recursive: true });

    // dist/<component>/template.html
    createMarkup(componentDir);
    
    // dist/<component>/script.js
    esbuild.build({
      bundle: true,
      entryPoints: [join(componentsDir, componentDir, 'script.mjs')],
      outdir: outputDir,
      plugins: []
    })
    .then(console.log)
    .catch(() => process.exit(1))

    // dist/<component>/styles.css - generate css from scss


  });


}

buildComponents()
  .then(console.log)
  .catch(console.error);
