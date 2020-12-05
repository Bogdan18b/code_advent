const fs = require('fs');

const fileParser = async (fileName) => {
  try {
    return fs.readFileSync(`./${fileName}.txt`, 'utf8')
  } catch (err) {
    console.error(err)
  }
}

module.exports = fileParser;