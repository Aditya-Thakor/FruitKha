import { useEffect, useState } from 'react'
import pd from '../../../assets/images/products/product-img-1.jpg'
import { useParams } from 'react-router-dom';

export default function ProductPage() {

    const [qt, setQt] = useState(1);

    const { pdt } = useParams();
    // const path= useParams();
    const [fruit, setFruit] = useState([]);


    useEffect(() => {
        fetch("http://localhost:5200/fruitkha/fruits")
            .then((res) => res.json())
            .then((data) => {
                // let ft = data
                let ft = data.filter(t => Number(t.id) === Number(pdt))
                setFruit(ft[0]);
                // console.log(ft);
            })
            .catch((error) => {
                console.log("Error at getting fruits data");
                console.log(error);
            });
    }, []);

    // useEffect(() => {

    //     let ft = fruits.filter(t => Number(t.id) === Number(pdt));
    //     // console.log(ft);
    //     setFrt(ft[0])
    // }, [pdt, fruits])

    return (
        <div className="vh-100 d-flex justify-content-center gap-5 align-items-center px-5 position-relative mt-5 pt-5">
            <div className="h-75 w-30 bg-light shadow-lg rounded-4 overflow-hidden ">
                <img src={fruit?.image} alt="" className='object-fit-fill h-100 w-100' />
            </div>
            <div className="h-75 w-50 d-flex flex-column justify-content-between ">
                <h3 className='fw-bold '>{fruit?.name}</h3>
                <div className=''>
                    <span className='h2 fw-bold'>{fruit?.nutritions?.calories}$</span>
                    <span className='mx-1 text-muted'>Per Kg</span>
                </div>
                <p className='text-muted d-flex flex-column gap-3'>
                    <span className='w-75'>
                        {fruit?.description}
                    </span>
                    <span>
                        <span className='fw-bold'>Category:</span>
                        <span> {fruit?.family}</span>
                    </span>
                </p>

                <div className=''>
                    <span>
                        <input
                            type="number"
                            value={qt}
                            onChange={(e) => setQt(e.target.value)}
                            className='form-control w-25 text-center'
                            min={1}
                            step={'1'}
                        />
                    </span>
                    <p className='mt-4'>Order price : <span className='h1 text-success fw-bold'>{fruit?.nutritions?.calories * qt}$</span></p>
                </div>
                <div className='d-flex gap-4'>
                    <button
                        onClick={() => {
                            console.log(fruit);
                            // console.log("typeOf pdt-",typeof pdt)
                            // console.log("frt-",typeof frt[0].id)
                        }}
                        className="btn ogbtn btn-outline-info rounded-5 px-4">
                        <i class="fa-solid fa-bag-shopping me-2 " />
                        Add to Cart
                    </button>
                    <button type="button" className="btn buy-btn text-white px-4 rounded-5">
                        <i class="fa-solid fa-credit-card me-2" />
                        Buy Now!
                    </button>
                </div>
            </div>
        </div>
    )
}