import React, { Component } from 'react';

class Modal extends Component {

  constructor() {

    super();

    this.state = {
      // message, settings
      type: null,
      // message: error, warning, info
      // settings: app-settings
      subType: null,
      // Only if type is message
      content: null,
    }

  }

  render() {

    const { type, subType } = this.state;

    const components = {

      message: {
        "error": <div>errdiv</div>,
        "warning": <div>wardiv</div>,
        "info": <div>infodiv</div>,
      },

      settings: {
        "app-settings": <div>appsettings</div>,
      },

    }

    return (type && subType) ? (components[type][subType]) : null;

  }

  /* componentDidMount() {

    // Set the context to this in modal
    modal = this;

    
  } */
  
}

module.exports = { Modal };