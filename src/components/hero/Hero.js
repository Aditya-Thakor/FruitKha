import { useNavigate } from "react-router-dom";

export default function Hero() {

    const navigate = useNavigate();

    return (
        <div>
            <div class="layer"></div>
            <div class="maintxt">
                <h4>FRESH & ORGANIC</h4>
                <h1>Delicious Seasonal Fruits</h1>
            </div>
            <div class="mainbtn ">
                <button
                    class="btn btn-outline-warning rounded-5 me-4"
                >Fruit Collection</button>
                <button
                    onClick={()=>{
                        navigate('/shop')
                    }}
                    class="btn btn-outline-warning rounded-5 ">Contact Us</button>
            </div>
        </div>
    )
}