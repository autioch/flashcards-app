const getData = require('./getData');
const fs = require('fs');
const path = require('path');

const { words } = getData();

const csv = words.map((word) => `${word.origin};${word.outcome}`).join('\n');

const savePath = path.join(__dirname, '..', 'public', 'library.csv');

fs.writeFile(savePath, csv, 'utf8', (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log('done!');
});
