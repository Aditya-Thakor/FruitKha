
export default function FruitCard({ img, name, price, onClick }) {
    return (
        <div
            className="card overflow-hidden"
            style={{ width: '291px', height: '485px' }}
            onClick={onClick}
        >
            <img
                className="card-img"
                src={img}
                alt=""
                height="300px"
                width="200px"
            />
            {/* <img className="card-img" src="/imgs/products/product-img-1.jpg" alt="" height="300px" width="200px" /> */}
            <div className="card-details">
                <h3 className="card-header-pills">{name}</h3>
                <p className="card-text d-flex flex-column"> <span> per Kg</span> {price}$</p>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-outline-info rounded-5">
                        <i class="fa-solid fa-bag-shopping" />
                        Add to Cart
                    </button>
                    <button type="button" className="btn buy-btn  rounded-5">
                        <i class="fa-solid fa-credit-card" />
                        Buy Now!
                    </button>
                </div>
            </div>
        </div>
    )
}