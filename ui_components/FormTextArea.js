import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class FormTextArea extends Component {
    constructor( props ) {
        super( props );
    }

    charsLeft(maxChars, stringValue){
        if(stringValue) {
            return maxChars - stringValue.length;
        }
        return maxChars;
    }

    render() {
        return (
          <FormGroup
            controlId={this.props.id ? this.props.id : ""}
            className={this.props.className ? this.props.className : ""}
          >
            {
              this.props.label ?
                <label>{this.props.label}</label>
              :
                ""
            }
            <FormControl
                componentClass="textarea"
                placeholder={this.props.placeholder ? this.props.placeholder : ""}
                maxLength={this.props.maxLength ? this.props.maxLength : ""}
                onChange={ (e)=> { this.props.onChange(e.target.value) } }
                value={ this.props.value }
            />
            {
                this.props.displayCharacterCount ?
                    <span>{ this.charsLeft(this.props.maxLength, this.props.value) } characters left</span>
                : ""
            }
          </FormGroup>
        );
    }
}

module.exports = FormTextArea;
