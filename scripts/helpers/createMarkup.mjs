import { writeFileSync } from 'fs';

const createMarkup = (data, path) => {
  writeFileSync(path, data, {
    flag: 'w',
  })
};

export default createMarkup;
