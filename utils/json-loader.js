const fs = require('fs');
const path = require('path');

function loadJSON(fileName) {

  const filePath = path.join(
    __dirname,
    '..',
    'data',
    'processed',
    fileName
  );

  const data = fs.readFileSync(filePath, 'utf-8');

  return JSON.parse(data);
}

module.exports = loadJSON;