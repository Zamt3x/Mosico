import React from 'react';
import { remote, dialog } from 'electron';
class Upload extends React.Component {
  render() {
    return (
      <div>
        <h1>Specify music path</h1>
        <button
          onClick={() => {
            remote.dialog.showOpenDialog(
              remote.getCurrentWindow(),
              {
                buttonLabel: 'Save path',
                properties: ['openDirectory'],
                title: 'Choose folder containing music files',
                filters: [
                  {
                    name: 'Images',
                    extensions: ['wav', 'mp3', 'aac', 'ogg', 'flac']
                  }
                ]
              },
              filesPath => {
                console.log(filesPath);
              }
            );
          }}>
          Choose path
        </button>
      </div>
    );
  }
}
module.exports = { Upload };
