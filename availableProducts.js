/**
 * Created by jkreft on 11/16/2016.
 */
import Product from './product';
import ProductHeaders from './productHeaders'

var MailerAvailableProducts = React.createClass( {
    componentWillReceiveProps: function ( nextProps ) {
        if ( nextProps.projectNumber && nextProps.projectNumber != this.props.projectNumber ) {
            this.props.appActions.getAvailableProducts( nextProps.projectNumber );
        }
    },
    selectOne: function ( productSKU ) {
        this.props.appActions.selectProduct( productSKU );
    },
    getAvailableProducts: function () {
        let unSelectedAvailable = this.props.available_products;
        if ( this.props.selected_products && 0 < this.props.selected_products.length ) {
            unSelectedAvailable = this.props.available_products.filter( product=> {
                let productIsInSelected = this.props.selected_products.filter( selectedProduct=>selectedProduct.product_sku == product.product_sku );
                return 0 == productIsInSelected.length;
            } );
        }
        var clickable = this.props.maxSelectable > this.props.appActions.numberOfSelectedProducts();
        return unSelectedAvailable.map( product=> {
            if( clickable && 0 == this.props.products_yearbooks ){
                var eYearbook = -1 < product.product_sku.indexOf( 'ybe' );
                if ( !eYearbook) {
                    clickable = ( -1 < product.product_sku.indexOf( 'yb' ) && !eYearbook || ( null == product.ship_to_home_price && null == product.eyearbook_price  ) );
                } else {
                    clickable = eYearbook ? ( this.props.products_yearbooks > this.props.products_eyearbook_pkg ) : true;
                }
            }

            return <Product key={product.product_sku} product={product}
                plus={true} clickable={clickable}
                products_yearbooks={this.props.products_yearbooks}
                products_eyearbook_pkg={this.props.products_eyearbook_pkg}
                disabled={!this.props.select_products}
                onClick={()=>this.selectOne( product.product_sku )}/>
        } )
    },
    render: function () {
        return (
            <div>
                <div className="col-md-12">
                    <strong>Available Products</strong>
                </div>
                <ProductHeaders />
				{this.getAvailableProducts()}
            </div>
        );
    }
} );

export default MailerAvailableProducts;
