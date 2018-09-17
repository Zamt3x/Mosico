import fs from 'fs';
import path from 'path';
import { remote } from 'electron';

// Store the path of locally stored file "userData"
const userDataPath = remote.app.getPath('userData');

class Storage {

  // INPUT String: fileName
  // OUTPUT String: data (data from the file)
  static readFile(fileName) {

    const filePath = path.join(userDataPath + '/data', fileName);

    return new Promise((resolve, reject) => {

      fs.readFile(filePath, 'utf8', (err, data) => {

        err ? reject(err) : resolve(data);

      });

    });

  }

  // INPUT String: fileName, String: content (content being written to the file)
  // OUTPUT Void (resolves promise)
  static writeFile(fileName, content) {

    const filePath = path.join(userDataPath + '/data', fileName);

    return new Promise((resolve, reject) => {

      fs.writeFile(filePath, content, err => {

        err ? reject(err) : resolve();

      });

    });

  }

  // INPUT String: directory (name of directory to be read from)
  // OUTPUT Array: files (array of filenames from input directory)
  static readDir(directory) {

    return new Promise((resolve, reject) => {

      fs.readdir(directory, (err, files) => {

        err ? reject(err) : resolve(files);

      });

    });

  }

}

module.exports = { Storage };