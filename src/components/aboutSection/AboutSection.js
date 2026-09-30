export default function AboutSection() {
    return(
        <div className="about-container d-flex">
        {/* <!-- video --> */}
        <div className="about-vdo d-flex justify-content-center align-items-center border-2 h-100 w-50 ">
            <div id="video-container" className=" d-flex justify-content-center align-items-center m-2">
                <div className="video-box vdobox d-flex justify-content-center align-items-center position-relative">
                    
                    <div className="filter"></div>
                    <a href="#video" className="play-btn " data-bs-toggle="modal">
                        <i className="fa-solid fa-play"></i>
                    </a>
                    
                    <div id="video" className="modal">
                        <div className="modal-dialog ">
                            <div className="modal-content">
                                <div className="modal-body ">
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/73UycrIe-cs?si=pR-fNhH-6mzY-0R3&amp;start=60" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- text --> */}
        <div className="abt-txt h-100 w-50">
            <div className="about-text">
                <p className="p1">Since Year 1999</p>
                <h2 className="abt-h2">We are <span className="txt-color">Fruitkha</span></h2>
                <p>Etiam vulputate ut augue vel sodales. In sollicitudin neque et massa porttitor vestibulum ac vel nisi. Vestibulum placerat eget dolor sit amet posuere. In ut dolor aliquet, aliquet sapien sed, interdum velit. Nam eu molestie lorem.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente facilis illo repellat veritatis minus, et labore minima mollitia qui ducimus.
                </p>
                <a href="#" className="btn ogbtn rounded rounded-5 ps-3 pe-3 mt-4">know more</a>
            </div>
        </div>
    </div>
    )
}