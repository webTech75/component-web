/**
 * Created by jkreft on 11/16/2016.
 */
import Product from './product';
import ProductHeaders from './productHeaders'

var SelectedProducts = React.createClass( {
    unSelectOne: function ( productSKU ) {
        this.props.appActions.unSelectProduct( productSKU );
    },
    getSelectedProducts: function () {
        return this.props.selected_products.map( product=> {
            return <Product key={product.product_sku} product={product}
                            plus={false}
                            products_yearbooks={this.props.products_yearbooks}
                            products_eyearbook_pkg={this.props.products_eyearbook_pkg}
                            disabled={!this.props.select_products}
                            onClick={()=>this.unSelectOne(product.product_sku)}
                            select_products={this.props.select_products} />
        } );
    },
    buildClassName: function( className ){
        return className.concat( " text-align-center col-md-12" );
    },
    editClick: function(){
        this.props.appActions.updateFieldValue( 'select_products', true );
    },
    render: function () {
        let hideEdit = this.props.disable ? this.props.disable : false;
        if( this.props.select_products ){
            hideEdit = true;
        }
        return (
            <div className="selected-products">
                <div className="col-md-12 padding-left-5">
                    <div className="col-md-6 padding-left-0">
                        <strong>Selected Products </strong> &nbsp;&nbsp;&nbsp;
                        { !hideEdit ?
                            <span className="validate-link" onClick={this.editClick}>edit</span> : ''
                        }
                    </div>
                </div>
				{ 0 != this.props.selected_products.length ?
                    <div className="padding-0 col-md-12">
                        <ProductHeaders />
                        {this.getSelectedProducts()}
                    </div>    :
                    <div id="select-products-warning" className={this.buildClassName( this.props.class )}>
                        Please Select Products
                    </div>
                    }
            </div>
        );
    }
} );

export default SelectedProducts;
