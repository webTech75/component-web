import React, { Component } from "react";
import classnames from 'classnames'
import HTML5Backend from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom';

import  { DragSource, DropTarget, DragDropContext } from 'react-dnd'
import Bars from '../ui_components/Bars.js';

let itemTypes = {
  CARD: 'card'
}

class CardDrop extends Component {

  showCount () {
    let { max, suffix, children } = this.props;
    const count = children[1].length;
    let statLine = '';

    if( this.props.max ) {
      statLine = `${count} of up to ${max} ${this.props.suffix}`;
    } else {
      statLine = `${count} ${this.props.suffix}`;
    }
    return statLine;
  }

  render() {
    let { type, connectDropTarget, isOver, isOverCurrent, children, max, suffix } = this.props;

    return connectDropTarget (
      <div className="online-products col-xs-4">
        <ul className="nav nav-pills nav-stacked">
          {children}
        </ul>
        <p>{this.props.showCount ? this.showCount() : ''}</p>
      </div>
    );
  }
}

let cardDropTarget = {
  drop(props, monitor) {
    if (props.max) {
      if (props.max <= props.children[1].length) {
        return;
      }
    }
    const item = monitor.getItem()
    let {type} = props
    let {currentType, value, id} = item
    props.onChange(item, type);
  }
}

function collectDrop(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true })
  };
};

CardDrop = DropTarget(itemTypes.CARD, cardDropTarget, collectDrop) (CardDrop)

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false
    }
  }

  render() {
    let {value, isDragging, connectDragSource, connectDropTarget, id} = this.props;
    return connectDropTarget (
      connectDragSource(
        <li>
          {value}
          <Bars />
        </li>
      )
    );
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

const cardSource = {
  beginDrag(props) {
    return {
      value: props.value,
      currentType: props.type,
      id: props.id,
      index: props.index
    }
  }
}

let cardTarget = {
  drop(props, monitor) {
    let item = monitor.getItem()
    let {type, index} = props
    let {currentType, value, id} = item
    if (item.index != props.index) {
      item.index = props.index;
    }
  }
}

Card = DragSource(itemTypes.CARD, cardSource, collect) (Card);
Card = DropTarget(itemTypes.CARD, cardTarget, collectDrop) (Card);

class CardDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leftList: props.leftList,
      rightList: props.rightList
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      leftList: nextProps.leftList,
      rightList: nextProps.rightList
    });
  }

  handleChange(item, toType){
    let newRightList = [];
    let newLeftList = [];
    let dragIndex = 0;
    item.type = toType;

    /* Remove from either list */
    newRightList = this.state.rightList.filter(x => x.id != item.id);
    newLeftList = this.state.leftList.filter(x => x.id != item.id);


    /* Add to the right list at the correct index */
    let listToAddTo = toType === "leftListItem" ? newLeftList : newRightList;
    dragIndex = listToAddTo.length === 0 ? 0 : item.index;
    listToAddTo.splice(dragIndex, 0, item);

    this.setState({
      leftList: newLeftList,
      rightList: newRightList
    });

    if(this.props.onChange) {
      this.props.onChange(newLeftList, newRightList);
    }
  }

  render() {
    return (
      <div className="row mailer-products">
        <CardDrop
          type="leftListItem"
          onChange={this.handleChange}
          max={this.props.leftMax}
          suffix={this.props.leftSuffix}
          showCount={true}
        >
          <li>
            {this.props.leftTitle}
          </li>
          {this.state.leftList.map(function (val, i) {
             return (
               <Card type="leftListItem" id={val.id} value={val.value} index={i} />
             );
           })}
        </CardDrop>
        <div className="col-xs-2">
          <div className="drag-drop">
              <h6>Drag and Drop</h6>
              <div className="left-arrow"></div>
              <div className="right-arrow"></div>
          </div>
        </div>
        <CardDrop
          type="rightListItem"
          onChange={this.handleChange}
          max={this.props.rightMax}
          suffix={this.props.rightSuffix}
          showCount={true}
        >
        <li>
          {this.props.rightTitle}
        </li>
        {this.state.rightList.map(function (val, i) {
           return (
             <Card type="rightListItem" id={val.id} value={val.value} index={i} />
           );
         })}
        </CardDrop>
      </div>
    )
  }
}

CardDeck = DragDropContext(HTML5Backend) (CardDeck);

module.exports = CardDeck;
