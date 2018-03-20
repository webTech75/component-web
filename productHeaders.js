/**
 * Created by jkreft on 11/16/2016.
 */

var ProductHeaders = React.createClass( {
    render: function () {
        return (
            <div className="product-headers padding-0 col-md-12">
                <div className="col-md-7">
                    Name
                </div>
                <div className="col-md-2">
                    Price
                </div>
                <div className="col-md-2">
                    Grade(s)
                </div>
                <div className="col-md-1">

                </div>
            </div>
        );
    }
} );

export default ProductHeaders;