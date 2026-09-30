import { useNavigate, useParams } from "react-router-dom"
import fzf from '../../assets/images/404.png';

export default function NotFound() {
    const navigate= useNavigate();

    const { page,ft } =useParams();
    // const page=useParams();
    return(
        <div className="vh-100 d-flex flex-column gap-3 justify-content-center align-items-center">
            <div className="h-50">
                <img src={fzf} alt="404" className="h-100 object-fit-cover" />
            </div>
            <h1 className="h1 ogbtn">{page} {ft}</h1> ////
            <h1 className="display-1">Not found</h1>

            <span>The page you requested for is not found.</span>
            <button 
                className="ogbtn rounded-5 px-4"
                onClick={()=>{
                    navigate('/')
                }}
            >
                Back to Home
            </button>
        </div>  
    )
}