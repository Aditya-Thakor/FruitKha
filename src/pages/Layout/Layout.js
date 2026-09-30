import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useEffect } from "react";

export default function Layout() {

    useEffect(()=>{

       fetch('http://localhost:5000/api/datas',{
            method:"GET",
            headers:{"content-type":"application/json"},
        }).then(res=>res.json()).then(data=>{
            console.log(data)
        }).catch(err => {
            console.warn("Failed to fetch datas: backend server is offline or route does not exist.", err.message);
        })
    


    },[])


    return (
        <div>
            <Navbar/>
                <Outlet/>
            <Footer/>
        </div>
    )
}