import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
const dataPath = remote.app.getPath('userData');
class Storage {
  // Takes in a file name and returns the content parsed as JSON
  static readFile(fileName) {
    const filePath = path.join(dataPath + '/data', fileName);
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const file = data.replace(/\\/g, '/');
          resolve(JSON.parse(file));
        }
      });
    });
  }
  static newFile(fileName, content) {
    // const folderPath = fp[0].replace(/\\/g, '/');
  }
}
module.exports = { Storage };
