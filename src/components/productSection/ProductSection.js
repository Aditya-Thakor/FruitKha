import product1 from '../../assets/images/products/product-img-1.jpg';
import product2 from '../../assets/images/products/product-img-2.jpg';
import product3 from '../../assets/images/products/product-img-3.jpg';

export default function ProductSection() {
    return (
        <div className="products ">
            <div className="ptxt">
                <span className="txt-color">Our </span><span> Products</span>
                <div className="line"></div>
                <div className="para">
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum id, voluptate vitae natus sed eius Lorem
                    </p>
                </div>

                {/* Products cards */}
                <div className="cardContainer d-flex justify-content-evenly align-content-center">

                    <div className="card overflow-hidden" style={{ width: '291px', height: '485px' }} >
                        <img className="card-img" src={product1} alt="" height="300px" width="200px" />
                        {/* <img className="card-img" src="/imgs/products/product-img-1.jpg" alt="" height="300px" width="200px" /> */}
                        <div className="card-details">
                            <h3 className="card-header-pills">Strawberry</h3>
                            <p className="card-text d-flex flex-column"> <span> per Kg</span> 85$</p>
                            <button className="btn btn-outline-info rounded-5"><i className="fa-solid fa-cart-shopping"></i>Add to Cart</button>
                        </div>
                    </div>
                    <div className="card overflow-hidden" style={{ width: '291px', height: '485px' }} >
                        <img className="card-img" src={product2} alt="" height="300px" width="200px" />
                        <div className="card-details">
                            <h3 className="card-header-pills">Berry</h3>
                            <p className="card-text d-flex flex-column"> <span> per Kg</span> 70$</p>
                            <button className="btn btn-outline-info rounded-5"><i className="fa-solid fa-cart-shopping"></i>Add to Cart</button>
                        </div>
                    </div>
                    <div className="card overflow-hidden" style={{ width: '291px', height: '485px' }} >
                        <img className="card-img" src={product3} alt="" height="300px" width="200px" />
                        <div className="card-details">
                            <h3 className="card-header-pills">Lemon</h3>
                            <p className="card-text d-flex flex-column"> <span> per Kg</span> 35$</p>
                            <button className="btn btn-outline-info rounded-5"><i className="fa-solid fa-cart-shopping"></i>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}