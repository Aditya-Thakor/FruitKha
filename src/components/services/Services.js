export default function Services() {

    const cards = [
        {
            service: "Free Shipping",
            subtxt: "When order over $75",
            icon: <i className="fa-solid fa-truck-fast"></i>
        },
        {
            service: "24/7 Support",
            subtxt: "Get support all day",
            icon: <i className="fa-solid fa-phone-volume"></i>
        },
        {
            service: "Refund",
            subtxt: "Get refund within 3 days!",
            icon: <i className="fa-solid fa-rotate"></i>
        },
    ]

    return (
        <div className="service d-flex justify-content-around align-items-center">
            {cards.map((card, ind) => (
                <div key={ind} className="scards d-flex justify-content-center align-items-center gap-3 ">
                    <div className="icn">{card.icon}</div>
                    <div className="txt text-start">
                        <h3>{card.service}</h3>
                        <p>{card.subtxt}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}