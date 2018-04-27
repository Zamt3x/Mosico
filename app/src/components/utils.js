import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
const dataPath = remote.app.getPath('userData');
class Storage {
  // Takes in a file name and returns the content
  static readFile(fileName) {
    const filePath = path.join(dataPath + '/data', fileName);
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const file = data.replace(/\\/g, '/');
          resolve(file);
        }
      });
    });
  }
  static writeFile(fileName, content) {
    const filePath = path.join(dataPath + '/data', fileName);
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
module.exports = { Storage };
