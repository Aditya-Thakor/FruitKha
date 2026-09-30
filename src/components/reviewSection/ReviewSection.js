export default function ReviewSection() {
    return(
         <div id="review-container" className=" align-content-center p-3 ">
        <div id="review" className=" carousel slide   text-center" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false" >
            <div className=" carousel-inner h-100 ">
                <div className=" carousel-item active h-100">
                    <div className="avtar a1 rounded-circle m-auto mt-2">
    
                    </div>
                        <div className="review-txt ">
                            <h3 className="d-flex flex-column h3-font mt-1">
                                Saira Hakim 
                                <span className="text-capitalize span-font mt-2">Local shop owner</span>
                            </h3>
                            <p className=" text-center text-capitalize p-font ">
									" Sed ut perspiciatis unde omnis iste natus error veritatis et  quasi architecto beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium "
                            </p>
                        </div>
                        <div className="icon">
                            <i className="fa-solid fa-quote-right"></i>
                        </div>
                </div>
                <div className=" carousel-item h-100">
                    <div className="avtar a2 rounded-circle m-auto mt-2"></div>
                        <div className="review-txt  ">
                            <h3 className="d-flex flex-column h3-font mt-1">
                                David Niph 
                                <span className="text-capitalize span-font mt-2">Local shop owner</span>
                            </h3>
                            <p className=" text-center text-capitalize p-font ">
                                " Sed ut perspiciatis unde omnis iste natus error veritatis et  quasi architecto beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium "
                            </p>
                        </div>
                        <div className="icon">
                            <i className="fa-solid fa-quote-right"></i>
                        </div>
                </div>
                <div className=" carousel-item h-100">
                    <div className="avtar a3 rounded-circle m-auto mt-2">
                        
                    </div>
                        <div className="review-txt ">
                            <h3 className="d-flex flex-column h3-font mt-1">
                                Jacob Sikim 
                                <span className="text-capitalize span-font mt-2">Local shop owner</span>
                            </h3>
                            <p className=" text-center text-capitalize p-font ">
                                " Sed ut perspiciatis unde omnis iste natus error veritatis et  quasi architecto beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium "
                            </p>
                        </div>
                        <div className="icon">
                            <i className="fa-solid fa-quote-right"></i>
                        </div>
                </div>
            </div>
        </div>
    </div>
    )
}