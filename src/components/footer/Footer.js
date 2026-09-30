import { Link } from "react-router-dom"

export default function Footer() {

  const links = [
    {
      name: "Home",
      to: "/"
    },
    {
      name: "About",
      to: "/about"
    },
    {
      name: "Shop",
      to: "/shop"
    },
    {
      name: "News",
      to: "/news"
    },
    {
      name: "Contact",
      to: "/contact"
    },
  ]

  return (
    <div class="footer-area">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="ftr-box about-us">
              <h2 class="ftr-title">About us</h2>
              <p>
                Ut enim ad minim veniam perspiciatis unde omnis iste natus error
                sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae.
              </p>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="ftr-box gt">
              <h2 class="ftr-title">Get In Touch</h2>
              <p>34/8, East Hukupara, Gifirtok, Sadan..</p>
              <p>support@fruitkha.com</p>
              <p>+00 111 222 3333</p>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="ftr-box pg">
              <h2 class="ftr-title">Pages</h2>
              <ul class="m-0 p-0 list-unstyled">
                {links.map((link, ind) => (
                  <li key={ind}>
                    <Link to={link.to}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="ftr-box about-us">
              <h2 class="ftr-title">Subscribe</h2>
              <p>Subscribe to our mailing list to get the latest updates.</p>
              <div class="email">
                <input type="email" placeholder="Email" />
                {/* <i class="fa-solid fa-paper-plane btn"></i> */}
                <i class="fa-solid fa-paper-plane btn" ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}