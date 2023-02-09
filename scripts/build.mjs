import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readdir, readFileSync, existsSync } from 'fs';
import * as esbuild from 'esbuild';
import handlebarsPlugin from 'esbuild-plugin-handlebars';
import handlebars from 'handlebars';
import createMarkup from './helpers/createMarkup.mjs';

const currDir = dirname(fileURLToPath(import.meta.url));
const componentsDir = resolve(currDir, '../', 'src', 'components');

console.log(`Component directory ${componentsDir}`);

readdir(componentsDir, (err, componentDir) => {
  if (err) {
    console.error(`Error in reading directory ${componentsDir}`);
  }
  console.log(`Directory name ${componentDir}`);
  const entryPath = `${componentsDir}/text/text.mjs`;
  console.log(entryPath);
  console.log(existsSync(entryPath));




  esbuild.build({
    bundle: true,
    entryPoints: [`${componentsDir}/text/texts.hbs`],
    outdir: 'dist/text',
    // outfile: 'dist/text.html',
    plugins: [
      handlebarsPlugin({
        additionalHelpers: {
          toString,
        },
        additionalPartials: {},
        precompileOptions: {}
      })
    ]
  })
  .then(console.log)
  .catch(() => process.exit(1))

  const srcTemplate = readFileSync(`${componentsDir}/text/texts.hbs`, 'utf-8');
  const compiledTemplate = handlebars.compile(srcTemplate);
  createMarkup(compiledTemplate({ artist: 'Beatles' }), `${resolve(currDir, '../', 'dist', 'text')}/text.html`);
});
