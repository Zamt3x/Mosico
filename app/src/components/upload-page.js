import fs from 'fs';
import path from 'path';
import React from 'react';
import mm from 'musicmetadata';
import { remote, dialog } from 'electron';
import { Storage } from './utils.js';
class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: [],
      totalSongs: 0,
      appData: null,
      musicPath: null,
      fileNames: null
    };
    this.getFileListItems = this.getFileListItems.bind(this);
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
  filterFiles(files) {
    // Allowed file types (audio)
    const EXTENSIONS = ['.mp3', '.ogg', '.flac', '.wav', '.aac'];
    // Loop through files in folder and filter away unsupported file types
    let targetFiles = files.filter(name => {
      for (let EXTENSION of EXTENSIONS) {
        // Checks name against multiple extensions
        if (path.extname(name).toLowerCase() === EXTENSION) {
          return true;
        }
      }
      return false;
    });
    this.setState({ totalSongs: targetFiles.length, fileNames: targetFiles }, () => {
      this.getFileListItems();
    });
  }
  getFileListItems() {
    let promises = [];
    for (let name of this.state.fileNames) {
      promises.push(this.formatName(name));
    }
    Promise.all(promises).then(data => {
      console.log(data);
      let items = [];
      // for (let obj in data) {
      //   console.log(obj);
      // //FIXME: potentially add setting for choosing if artist or songname comes
      // // first in names (artist - name / name - artist)
      // items.push(
      //   <li className="song-container btn-hide" key={name}>
      //     <div className="grouper-horiz">
      //       <i className="material-icons btn">play_arrow</i>
      //       <p>{nameObj.songName}</p>
      //     </div>
      //     <p>
      //       {nameObj.artist} ({nameObj.duration})
      //     </p>
      //   </li>
      // );
      // }
      // this.setState({ songList: items });
    });
  }
  //FIXME: get duration here and make calling place wait for promise
  //FIXME: doesnt fiend header cux lack of mp3 info
  formatName(name) {
    return new Promise((res, rej) => {
      const stream = fs.createReadStream(path.join(this.state.musicPath, name));
      mm(stream, { duration: true }, (err, metadata) => {
        if (err) {
          rej(err);
        } else {
          let songName = name;
          // Gets rid of file extension with RegExp
          songName = songName.replace(/\.[^/.]+$/, '');
          //FIXME: potentially add settings option for choosing delimiter (-)
          songName = songName.split('-');
          stream.close();
          res({ artist: songName[0], songName: songName[1], duration: metadata.duration });
        }
      });
    });
  }
  render() {
    const { musicPath, fileNames, totalSongs, songList } = this.state;
    return musicPath ? (
      // Defined music path
      <div>
        <h1>Play from local files</h1>
        <div className="grouper-horiz">
          <button
            className="button"
            onClick={() => {
              remote.dialog.showOpenDialog(
                remote.getCurrentWindow(),
                {
                  buttonLabel: 'Set folder',
                  properties: ['openDirectory'],
                  title: 'Browse for folder'
                },
                filesPath => {
                  this.setFolderPath(filesPath);
                }
              );
            }}>
            Change
          </button>
          <h3 className="heading-info path-name">{musicPath}</h3>
        </div>
        <h3 className="heading-info">{totalSongs} total songs</h3>
        <div className="divider" />
        <div>
          <ul className="song-list">{songList}</ul>
        </div>
      </div>
    ) : (
      // Undefined music path
      <div>
        <h1>Set path to local files</h1>
        <button
          className="button"
          onClick={() => {
            remote.dialog.showOpenDialog(
              remote.getCurrentWindow(),
              {
                buttonLabel: 'Set folder',
                properties: ['openDirectory'],
                title: 'Browse for folder'
              },
              filesPath => {
                this.setFolderPath(filesPath);
              }
            );
          }}>
          Pick Folder
        </button>
      </div>
    );
  }
  componentDidMount() {
    Storage.readFile('app-data.json')
      .then(data => {
        const parsed = JSON.parse(data);
        this.setState({ appData: parsed, musicPath: parsed.sourcePath }, () => {
          Storage.readDir(parsed.sourcePath).then(files => {
            this.filterFiles(files);
          });
        });
      })
      .catch(err => {
        this.setState({ appData: null, musicPath: null });
      });
  }
}
module.exports = { Upload };
