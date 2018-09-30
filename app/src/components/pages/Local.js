import path from 'path';
import React, { Component } from 'react';
import { remote, dialog } from 'electron';
import Storage from '../utils/Storage';

class Local extends Component {

  state = {
    songList: [],
    totalSongs: 0,
    appData: null,
    musicPath: null,
    fileNames: null
  }

  setFolderPath = path => {

    // Replace backslashes with forwardslashes in path and store it
    const folderPath = path.replace(/\\/g, '/');

    // Attempt to read the file 'app-data.json'
    Storage.readFile('app-data.json')
      // If file exists, find key "sourcePath" and replace its value
      .then(data => {

        // RegExp matches object key 'sourcePath:' and anything between "" after it (value)
        // Uses RegExp instead of converting to json because it's a lot easier
        const result = data.replace(/"sourcePath":"(.*)"/, `"sourcePath":"${folderPath}"`);

        Storage.writeFile('app-data.json', result)
          .then(() => {

            this.setState({ musicPath: folderPath });

          })
          .catch(err => {

            // TODO: ERRMSG Error message new path could not be saved properly plz retry
            console.error(err);

          });
      })
      // Fail assumes that the file does not exist and creates a new file with sourcePath
      .catch(err => {

        Storage.writeFile('app-data.json', `{"sourcePath":"${folderPath}"}`)
          .then(() => {

            this.setState({ musicPath: folderPath });

          }).catch(err => {

            // TODO: ERRMSG Error message file with path could not be created plz retry
            console.error(err);

          });

      });

  }

  filterFiles = files => {

    // Allowed file types (audio)
    const EXT = ['.mp3', '.ogg', '.flac', '.wav', '.aac'];

    // Loop through files in folder and filter away unsupported file types
    const targetFiles = files.filter(name => {

      for (let ext of EXT) {

        // Check name against the allowed extensions and return true (keeps item)
        if (path.extname(name).toLowerCase() === ext) return true

      }

      // Return false if no extensions matched (discards item)
      return false;

    });

    // Update the state with valid files
    this.setState({ totalSongs: targetFiles.length, fileNames: targetFiles }, () => {

      this.getFileListItems();

    });

  }

  getFileListItems = () => {

    // INPUT String: name (name of the song, which could be
    // artist - name or name - artist)
    // OUTPUT Object: 
    const formatFileName = (name) => {

      // Get rid of file extension
      name = name.replace(/\.[^/.]+$/, '');

      //TODO: ADD settings option for choosing delimiter? ("-" is default)
      name = name.split('-');

      return { artist: name[0], song: name[1] };

    }

    let items = [];
    const { fileNames } = this.state;

    for (let name of fileNames) {

      const track = formatFileName(name);

      //TODO: ADD setting for choosing if artist or song comes?
      // first in names (artist - name / name - artist)

      // FIXME: JANKY looks janky and fucked up
      items.push(
        <li className="song-container" key={name}>
          <div className="grouper-horiz">
            <i className="material-icons btn">play_arrow</i>
            <p>{track.song}</p>
          </div>
          <p>{track.artist}</p>
        </li>
      );

    }

    this.setState({ songList: items });

  }

  render() {

    const { musicPath, totalSongs, songList } = this.state;

    const openDialog = () => {

      remote.dialog.showOpenDialog(
        // Window that the modal is tied to (current window)
        remote.getCurrentWindow(),
        // Set the mode to directory
        { properties: ['openDirectory'] },
        // Callback function to process selected folder
        filesPath => { this.setFolderPath(filesPath[0]) }
      );

    }

    return musicPath ? (
      <div>
        <h1>Play from local files</h1>
        <div className="grouper-horiz">
          <button
            className="button"
            onClick={() => { openDialog() }}>
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
        <div>
          <h1>Set path to local files</h1>
          <button
            className="button"
            onClick={() => { openDialog() }}>
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

          }).catch(err => {

            // TODO: ERRMSG error reading from specified folder?

          });

        });

      })
      .catch(err => {

        // TODO: ERRMSG error reading file?
        this.setState({ appData: null, musicPath: null });

      });

  }

}

export default Local;