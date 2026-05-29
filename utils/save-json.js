const fs = require('fs');

const path = require('path');

function saveJSON(name, data) {

  const fileName =
    name.toLowerCase().replace(/\s+/g, '-')
    + '.json';

  const filePath = path.join(
    __dirname,
    '..',
    'data',
    'processed',
    fileName
  );

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  );

  console.log(`Saved ${fileName}`);
}

module.exports = saveJSON;