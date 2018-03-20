import React, {Component} from 'react';

class TableLoader extends Component {
  render() {
    return (
        <div className="text-align-center">
            <i className='fa fa-spinner fa-pulse fa-fw' aria-hidden='true'></i>
        </div>
    );
  }
}

module.exports = TableLoader;
