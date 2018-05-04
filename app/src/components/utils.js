import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
const dataPath = remote.app.getPath('userData');
class Storage {
  // Takes in a file name and returns the content of a file
  static readFile(fileName) {
    const filePath = path.join(dataPath + '/data', fileName);
    return new Promise((res, rej) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      });
    });
  }
  // Takes in a file name and content to produce or modify a file
  static writeFile(fileName, content) {
    const filePath = path.join(dataPath + '/data', fileName);
    return new Promise((res, rej) => {
      fs.writeFile(filePath, content, err => {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  }
  // Takes in a path to directory and returns all the files from it
  static readDir(directory) {
    return new Promise((res, rej) => {
      fs.readdir(directory, (err, files) => {
        if (err) {
          rej(err);
        } else {
          res(files);
        }
      });
    });
  }
}
module.exports = { Storage };
