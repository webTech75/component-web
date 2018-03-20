import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class ExportBtn extends Component {
  render() {
    return (
      <div>
        <Button className="float-right export-btn m0">
          <span className="export-icon-lg"></span>
          <span>Export to Excel</span>
        </Button>
      </div>
      );
  }
}
