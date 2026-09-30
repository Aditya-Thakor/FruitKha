import offerImg from '../../assets/images/a.jpg';
export default function Offer() {
    return (
        <div className="offer d-flex">
            <div className="ad">
                <div className="pricebox d-flex justify-content-center align-items-center">
                    <div className="c1"></div>
                    <div className="c2 d-flex justify-content-center align-items-center">
                        <span className=" price fz d-flex flex-column justify-content-center align-items-center"><strong>30%</strong>Off per Kg</span>
                    </div>
                </div>
                {/* <img src="/imgs/a.jpg" alt="" /> */}
                <img src={offerImg} alt="offer-image" />
            </div>
            <div className="adtxt text-start h-100 w-50 ">
                <div className="h-txt">
                    <h3><span className="txt-color">Deal</span> of the month</h3>
                    <h4 className="text-uppercase ">Hikan Strwaberry</h4>
                </div>
                <div className="p-txt position-relative ">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, velit. Vero ex accusantium neque modi quas ipsa, molestiae commodi inventore temporibus nobis deserunt tempora, eius unde eveniet fuga nostrum natus nesciunt atque.
                </div>

                <div className="time d-flex  align-items-center  position-relative gap-1">
                    <div className="box d-flex flex-column justify-content-center align-items-center">
                        <span className="zero">00</span>
                        <span className="t-txt">Days</span>
                    </div>
                    <div className="box d-flex flex-column justify-content-center align-items-center">
                        <span className="zero">00</span>
                        <span className="t-txt">Hours</span>
                    </div>
                    <div className="box d-flex flex-column justify-content-center align-items-center">
                        <span className="zero">00</span>
                        <span className="t-txt">Mins</span>
                    </div>
                    <div className="box d-flex flex-column justify-content-center align-items-center">
                        <span className="zero">00</span>
                        <span className="t-txt">Secs</span>
                    </div>
                </div>
                <button className="btn rounded-5 position-relative "><i className="fa-solid fa-cart-shopping me-2"></i>Add to Cart</button>
            </div>
        </div>
    )
}