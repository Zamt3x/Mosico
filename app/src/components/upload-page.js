import fs from 'fs';
import path from 'path';
import React from 'react';
import { remote, dialog } from 'electron';
class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicPath: null
    };
    this.setFolderPath = this.setFolderPath.bind(this);
  }
  setFolderPath(fp) {
    // Replaces backslashes with forwardslashes in paths
    const folderPath = fp[0].replace(/\\/g, '/');
    const dataPath = remote.app.getPath('userData');
    const filePath = path.join(dataPath, 'data/app-data.json');
    // fs.writeFileSync(filePath, `{"sourcePath":""}`);
    this.setState({ musicPath: folderPath }, () => {
      try {
        const data = fs.readFileSync(filePath, 'utf8');
        // RegExp matches object key 'sourcePath:' and anything between "" after it
        const result = data.replace(/"sourcePath":)"(.*)"/, `"sourcePath":${folderPath}`);
        fs.writeFileSync(filePath, result);
      } catch (err) {
        fs.writeFileSync(filePath, `{"sourcePath":"${folderPath}"}`);
      }
    });
  }
  render() {
    const { musicPath } = this.state;
    return (
      <div>
        <h1>Specify music path</h1>
        <button
          onClick={() => {
            remote.dialog.showOpenDialog(
              remote.getCurrentWindow(),
              {
                buttonLabel: 'Set folder',
                properties: ['openDirectory'],
                title: 'Choose folder with music files'
              },
              filesPath => {
                this.setFolderPath(filesPath);
              }
            );
          }}>
          Choose path
        </button>
        <h3>{musicPath ? musicPath : 'No path specified'}</h3>
      </div>
    );
  }
}
module.exports = { Upload };
