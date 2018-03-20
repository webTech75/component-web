import React, { Component,PropTypes } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

/*
    Sample Usage:
        <ReactMultiSelect selectFrom={selectFrom} onChange={(e)=>{console.log("Id's of Grades Selected",e)}}/>
    Props:

    Prop Name   | PropType  | Default  | Notes
    ----------  |---------- |--------- | -----
    selectfrom  |  array    |  []      | List of grades to choose from Ex: [{"grade":"Pre-K","id":"13"},{"grade":"Kinder","id":"14"}]
    selected    |  array    |  []      | List of grades to choose from Ex: [{"grade":"Pre-K","id":"13"},{"grade":"Kinder","id":"14"}]
    isSelectAll |  bool     |  false   | To show "select all" checkbox that selects all available grades
    onChange    |  func     |  null    | function to trigger when a grade is selected, returns array of gradeIds selected
    canSelectAll|  bool     |  false   | determines if checkbox is clickable or not

*/

class ReactMultiSelect extends Component {
   constructor(props){
      super(props)
      this.state = {
      selectFrom : [],
      selected : []
    }
  }

  translateTo(convertType,grades){
    grades = Array.isArray(grades) ? grades : [ grades ]
    var selectFrom = this.props.selectFrom
    if(convertType === 'idsToNames') {
        var gradeNames = []
        for(var i in grades){
            for(var j in selectFrom) {
                if(grades[i] === selectFrom[j].id){
                    gradeNames.push(selectFrom[j].grade)
                }
            }
        }
        return gradeNames
    }else if(convertType === 'namesToIds'){
        var gradeIds = []
        for(var i in grades){
            for(var j in selectFrom) {
                if(grades[i] === selectFrom[j].grade){
                    gradeNames.push(selectFrom[j].id)
                }
            }
        }
        return gradeIds
    }
        return []
 }

  selectAll(){
      this.setState({ selected:this.state.selectFrom },()=>{ this.props.onChange(this.getGrades()) })
  }

  getGrades(){
    var gradeIds = []
    var selected = this.state.selected
    for(var i in selected){
        gradeIds.push( selected[i].value )
    }
    return gradeIds
  }

  componentWillMount(){
    this.processProps(this.props)
  }

  handleChange(selected){
    this.setState({
        selected
    },()=>{ this.props.onChange ? this.props.onChange(this.getGrades()): null } )
  }

  processProps(props){
    var selectFrom = []
    for(var k in props.selectFrom){
        selectFrom.push({
            value: props.selectFrom[k].id,
            label: props.selectFrom[k].grade
        })
    }

    var selected = []
    for(var k in props.selected){
        selected.push({
            value: props.selected[k],
            label: this.translateTo("idsToNames", props.selected[k]).toString()
        })
    }

    this.setState({
      selectFrom: selectFrom,
      selected: selected
    })
  }

  componentWillReceiveProps(nextProps){
      this.processProps(nextProps)
  }

  render() {
    var selectAllChecked = JSON.stringify(this.state.selected) === JSON.stringify(this.state.selectFrom);
    if (this.props.isSelectAll) {
      return (
        <div>
          <div className="col-md-10">
            <Select
              multi
              name="form-field-name"
              value={ this.state.selected }
              options={ this.state.selectFrom }
              onChange={ (selected)=>{ this.handleChange(selected) } }
              searchable = { false }
            />
          </div>
          <div className="col-md-2">
              <label className={ selectAllChecked ? 'color-grey' : 'color-blue'}> <input id="checkBox" checked={ selectAllChecked } type="checkbox" hidden onChange={(e)=>{ this.selectAll() } }/> All </label>
          </div>
        </div>
      );
    }
    else {
      return (
        <Select
          multi
          name="form-field-name"
          value={ this.state.selected }
          options={ this.state.selectFrom }
          onChange={ (selected)=>{ this.handleChange(selected) } }
          searchable = { false }
        />
      );
    }
  }
}

ReactMultiSelect.propTypes = {
  selected: PropTypes.array,
  selectAll: PropTypes.array,
  onChange: PropTypes.func,
  isSelectAll : PropTypes.bool
};

ReactMultiSelect.defaultProps = {
  selected: [],
  selectAll: [],
  isSelectAll: false
};

export default ReactMultiSelect;
