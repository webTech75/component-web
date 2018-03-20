import "./multi-select.less";

/**
 * Created by jkreft on 11/28/2016.
 */

    /*
    items
    selected
    disabled
     */

var MultiSelect = React.createClass( {
    getDefaultProps: function() {
        return {
            disabled: [],
            onClick: function() {}
        }
    },
    getInitialState: function() {
        return {
            xFilter: this.props.selected || []
        }
    },
    buildOptions: function( i, item ) {
        let itemText = item;
        let className = 'cursor-pointer col-md-12';
        if( -1 < this.state.xFilter.indexOf( item ) || -1 < this.props.disabled.indexOf( item ) ){
            className = className.concat( ' multiselect-disabled')
        }
        return (
            <li key={i} className={className} value={item} onClick={this.handleClick}>{itemText}</li>
        )
    },
    buildSelected: function( i, item ){
        let itemText = item;
        return (
            <div key={i} className='multiselect-selected cursor-pointer col-md-3' onClick={this.handleClick}>
                <div value={item} className='col-md-8'>{itemText}</div>
                <div value={item} className='col-md-4 text-dark-grey text-right close'>X</div>
            </div>
        )
    },
    handleClick: function( event ){
        let value = event.target.value;
        if ( -1 == this.props.disabled.indexOf( value ) ){
            let selections = this.state.xFilter;
            let index = selections.indexOf(value);
            if (-1 < index) {
                selections.splice(index, 1);
            }
            else {
                selections = selections.concat(event.target.value);
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
        for( let i = 0; i < this.props.items.length; i++ ){
            if( !this.props.disabled.includes( this.props.items[i].toString() ) ) {
                items.push( this.buildOptions( i, this.props.items[ i ] ) );
            }
        }
        for( let i = 0; i < this.state.xFilter.length; i++ ){
            selected.push( this.buildSelected( i, this.state.xFilter[ i ] ) );
        }
        return (
            <div className={this.buildClass()}>
                <div className='multiselect-selected-wrapper col-md-12'>{selected}</div>
                <div className='multiselect-list-wrapper col-md-12'>
                    <ul>
                        {items}
                    </ul>
                </div>

            </div>
        );
    }
} );


export default MultiSelect;
