import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

const partialDirectory = [
  resolve(__dirname, 'src', 'components', 'text', 'partials'),
];

console.log({partialDirectory});


export default {
  plugins: [
    handlebars({
    partialDirectory,
    }),
  ],
};
