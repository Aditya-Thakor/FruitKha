import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import FruitCard from "../../components/fruitCard/FruitCard";


export default function Shop() {

    const [fruits, setFruits] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFruits = fruits?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(fruits.length / itemsPerPage);

    /*
    
    try {
        
    } catch (error) {
        
    }

    */ 

    const navigate = useNavigate(); 

    useEffect(() => {
        // fetch("http://localhost:5200/fruitkha/api/fruits")
        fetch("http://localhost:5200/fruitkha/fruits").then((res) => res.json()).then((data) => {
                setFruits(data)
            }).catch((error) => {
                console.log("Error at getting fruits data");
                console.log(error);
            })
    }, [])

    return (
        <div id="shop" className=" text-center">
            <Navbar />
            <div className="ptxt vh-50 ">
                <span className="txt-color heading-font ">Our </span><span className="heading-font"> Fresh Fruits</span>
                <div className="line"></div>
                <div className="para">
                    <p>
                        Discover nature’s sweetest and healthiest picks, A colorful collection of juicy goodness
                    </p>
                </div>
            </div>
            {/* <h1 className="h1 mt-5 pt-5 text-decoration-underline mb-5">Shop all</h1> */}
            <div className="h-auto position-static d-flex flex-wrap justify-content-between gap-4 mx-5 my-3">
                {fruits.length === 0 ?
                    <div className="h5 w-100 text-center">loading fruits...</div> :
                    currentFruits.map((fruit) => (
                        <FruitCard
                            // img={fruitsWithImages.find(img => img.name == fruit?.name)?.image}
                            img={fruit.image}
                            name={fruit.name}
                            onClick={() => {

                                navigate(`/products/product/${fruit.id}`) // "test "+ var +"demo"
                            }}
                            price={fruit.nutritions.calories}
                        />
                    ))}
            </div>

            {/* pagination */}
            <div className="mt-5">
                <ul className="pagination border-0 justify-content-center mt-4">

                    {/* Previous */}
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                    </li>

                    {/* Page numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                        <li
                            key={index}
                            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    {/* Next */}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </li>

                </ul>
            </div>

        </div>
    )
}