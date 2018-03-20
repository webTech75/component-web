/**
 * Created by jkreft on 11/16/2016.
 */
var Product = React.createClass( {
    getPrice: function(){
        let price = parseFloat(this.props.product.price);
        return price.toFixed(2)
    },
    clickBox: function () {
        let classes = this.props.plus? "glyphicon glyphicon-plus glyphicon-black" : "glyphicon glyphicon-remove glyphicon-black";
        return (
            <div className="product-btn" onClick={this.props.onClick}>
                <span className={classes}></span>
            </div>
        );
    },
    display: function(){
        let disabled = this.props.disabled ? this.props.disabled : false;
        let eYearbook = -1 < this.props.product.product_sku.indexOf( 'ybe' );
        if( this.props.plus ){
            disabled = ( this.props.plus && !this.props.clickable );
        }
        if( true == disabled ){
            return false;
        }
        else if( this.props.products_yearbooks && this.props.products_eyearbook_pkg ) {
            if (0 == this.props.products_yearbooks && !eYearbook) {
                let isYearbook = -1 < this.props.product.product_sku.indexOf('yb');
                return ( isYearbook && !eYearbook || ( null == this.props.product.ship_to_home_price && null == this.props.product.eyearbook_price  ) );
            } else {
                if (eYearbook) {
                    return ( this.props.yearbooks > this.props.products_eyearbook_pkg );
                } else {
                    return true;
                }
            }
        }
        else{
            return true;
        }
    },
    render: function () {
        let grades = [],
            productGrades = this.props.product.product_grades;
        if( 'undefined' !== typeof productGrades ){
            for( let i = 0; i < productGrades.length; i++ ){
                grades.push( productGrades[ i ].grade_short_form );
            }
            grades = grades.join( ', ' );
        }
        return (
            <div className="col-md-12 product">
                <div className="col-md-7">
                    <div className="form-control-static"><strong>{this.props.product.product_name}</strong></div>
                </div>
                <div className="col-md-2">
                    <div className="form-control-static"><strong>$ {this.getPrice()}</strong></div>
                </div>
                <div className="col-md-2">
                    <div className="form-control-static"><strong>{grades}</strong></div>
                </div>
                <div className="col-md-1">
                    { this.display() ?
                        <span>
                            <div className="form-control-static text-center">{this.clickBox()}</div>
                        </span> : ''
                        }
                </div>

            </div>
        );
    }
} );

export default Product;