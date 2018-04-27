import fs from 'fs';
import path from 'path';
import React from 'react';
import { Storage } from './utils.js';
import { remote, dialog } from 'electron';
class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appData: null,
      musicPath: null
    };
    this.setFolderPath = this.setFolderPath.bind(this);
  }
  setFolderPath(fp) {
    // Replaces backslashes with forwardslashes in path
    const folderPath = fp[0].replace(/\\/g, '/');
    // Attempt to read the file 'app-data.json'
    Storage.readFile('app-data.json')
      .then(data => {
        // RegExp matches object key 'sourcePath:' and anything between "" after it
        const result = data.replace(/"sourcePath":"(.*)"/, `"sourcePath":"${folderPath}"`);
        // Success replaces current saved path with a new one
        Storage.writeFile('app-data.json', result)
          .then(() => {
            this.setState({ musicPath: folderPath });
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        // Fail creates a new sourcePath
        Storage.writeFile('app-data.json', `{"sourcePath":"${folderPath}"}`).then(() => {
          this.setState({ musicPath: folderPath });
        });
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
  componentDidMount() {
    Storage.readFile('app-data.json')
      .then(data => {
        const parsed = JSON.parse(data);
        this.setState({ appData: parsed, musicPath: parsed.sourcePath });
      })
      .catch(err => {
        this.setState({ appData: null, musicPath: null });
      });
  }
}
module.exports = { Upload };
