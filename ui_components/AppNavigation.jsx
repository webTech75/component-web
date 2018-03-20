import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Tab, Nav, NavItem } from 'react-bootstrap';

/*
 * App Navigation component accepts n number of Navigation Tab Pills `Titles and their content`
 * Tab Content should be passed in as a child components in order of their titles.
 * defaultActiveKey is the Tab that you would like to show as default,
 * the value of defaultActiveKey is the array index of the tabLabels prop.
 * */
class AppNavigation extends Component {
  static defaultProps = {
    id: 'tab-container',
    defaultActiveKey: '0',
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    id: PropTypes.string,
    defaultActiveKey: PropTypes.string,
    returnLabel: PropTypes.string.isRequired,
    returnUrl: PropTypes.string.isRequired,
    tabLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    showSpinner: PropTypes.bool.isRequired,
  };

  displayNavItems() {
    return (
      <div className="top-nav-wrapper">
        <Nav className="fixed-width" bsStyle="pills">
          {
            this.props.returnUrl ?
              <li><a href={this.props.returnUrl}>{this.props.returnLabel}</a></li>
            : ''
          }
          {
            this.props.tabLabels.map((key, tab) => {
              return (
                <NavItem eventKey={tab}>
                  {key}
                </NavItem>
              );
            })
          }
        </Nav>
      </div>
    );
  }

  render() {
    return (
      <Tab.Container
        id={this.props.id}
        defaultActiveKey={parseInt(this.props.defaultActiveKey)}
        className={this.props.showSpinner ? 'opacity-30' : ''}
      >
        <Row className="clearfix">
          { this.displayNavItems() }
          <Tab.Content className="container" animation>
            {
              React.Children.map(this.props.children, (key, child) => {
                return (
                  <Tab.Pane eventKey={child}>
                    {key}
                  </Tab.Pane>
                );
              })
            }
          </Tab.Content>
        </Row>
      </Tab.Container>
    );
  }
}
module.exports = AppNavigation;
