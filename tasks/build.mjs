import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readdir, readFile, existsSync } from 'fs';
import * as esbuild from 'esbuild';
import handlebarsPlugin from 'esbuild-plugin-handlebars';

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
    entryPoints: [ entryPath,  `${componentsDir}/text/texts.hbs`],
    outdir: 'dist/text',
    plugins: [
      handlebarsPlugin()
    ]
  })
  .then(console.log)
  .catch(() => process.exit(1))

});
