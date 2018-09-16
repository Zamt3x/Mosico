import fs from 'fs';
import path from 'path';
import React, { Component } from 'react';
import { Storage } from '../../utilities.js';
import { remote, dialog } from 'electron';

class Local extends Component {
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
    let items = [];
    for (let name of this.state.fileNames) {
      const track = this.formatName(name);
      //FIXME: potentially add setting for choosing if artist or songname comes
      // first in names (artist - name / name - artist)
      items.push(
        <li className="song-container" key={name}>
          <div className="grouper-horiz">
            <i className="material-icons btn">play_arrow</i>
            <p>{track.songName}</p>
          </div>
          <p>{track.artist}</p>
        </li>
      );
    }
    this.setState({ songList: items });
  }
  formatName(name) {
    // Gets rid of file extension with RegExp
    name = name.replace(/\.[^/.]+$/, '');
    //FIXME: potentially add settings option for choosing delimiter (-)
    name = name.split('-');
    return { artist: name[0], songName: name[1] };
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
module.exports = { Local };