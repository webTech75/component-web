/**
 * Created by aranginwala on 3/14/2017 <==== Pi Day.
 *
 * This version of MultiSelect takes in key/value pairs in an array.  The expectation is the key will be "id"
 * and the value will be "name".  This will go in the "items" property. An example of an incoming items property:
 *      this.grades = [
 *                        { "name": "Pre-K", "id": 13 },
 *                        { "name": "Kinder", "id": 14 },
 *                        { "name": "1", "id": 1 },
 *                        { "name": "2", "id": 2 },
 *                        { "name": "3", "id": 3 }]
 *
 * The decision to make this an array of JavaScript Objects was to keep order.  This component will honor the ordering
 * as the array has it.
 *
 * Everything else in this component is run by "id" values.
 * - You can optionally pass in an array of selected "id"s in the "selected" property.
 * - You can optionally pass in an array of disabled "id"s in the "disabled" property.
 * - You can also pass in an onChange handler in the onChange property.
 *
 * An example of how to use the component is:
 *
 * <MultiSelectKeyValue items={ this.grades } selected={ this.state.grades } disabled={ [] } onChange={ this.handleGradeChange } />
 */


var MultiSelectKeyValue = React.createClass( {
    getDefaultProps: function() {
        return {
            disabled: [],
            onClick: function() {},
            expanded: false
        }
    },

    getInitialState: function() {
        return {
            xFilter: this.props.selected || []
        }
    },

    componentWillReceiveProps: function(nextProps) {
        let new_selected = nextProps.selected;
        if ( new_selected && new_selected.length > 0 ) {
            this.setState({xFilter: nextProps.selected});
        }
    },

    buildOptions: function(id, name) {
        let className = 'cursor-pointer col-md-12';
        if( -1 < this.state.xFilter.indexOf(id) || -1 < this.props.disabled.indexOf(id) ){
            className = className.concat( ' multiselect-disabled')
        }
        return (
            <li key={ id } className={className} value={ id } onClick={this.handleClick.bind(this, id)}>{ name }</li>
        )
    },

    buildSelected: function(id, name){
        return (
            <div key={ id } className='multiselect-selected cursor-pointer col-md-3' onClick={this.handleClick.bind(this, id)}>
                <div value={ id } className='col-md-8'>{ name }</div>
                <div value={ id } className='col-md-4 text-dark-grey text-right close'>X</div>
            </div>
        )
    },

    handleClick: function( id ){
        let id_type = typeof this.props.items[0][this.props.key_name];
        let value = id;
        if (id_type === 'string') {
            value = id.toString();
        }

        if ( -1 == this.props.disabled.indexOf( value ) ){
            let selections = this.state.xFilter;
            let index = selections.indexOf(value);
            if (-1 < index) {
                selections.splice(index, 1);
            }
            else {
                selections = selections.concat(value);
            }
            this.setState({xFilter: selections});
            this.props.onChange( selections );
        }
    },
    handleFilterChange: function( event ){

    },
    buildClass: function(){
        let className = 'multiselect ';
        let propsClass = this.props.class ? this.props.class : '';
        return className.concat( propsClass );
    },
    render: function(){
        let items = [];
        let selected = [];
        let key_name = this.props.key_name;
        let value_name = this.props.value_name;
        if ( this.props.items ) {
            for (var entry of this.props.items) {
                if( !this.props.disabled.includes(entry[key_name])) {
                    items.push(this.buildOptions(entry[key_name], entry[value_name]));
                }
                if (this.state.xFilter.includes(entry[key_name])) {
                    selected.push( this.buildSelected(entry[key_name], entry[value_name]));
                }
            }
        }

        return (
            <div className="multiselectContainer">
                <div className={this.buildClass()}>
                    <div className='multiselect-selected-wrapper col-md-12'>{selected}</div>
                    <div className='multiselect-list-wrapper expanded col-md-12'>
                        <ul>
                            {items}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
} );


export default MultiSelectKeyValue;
