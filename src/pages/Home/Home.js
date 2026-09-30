import AboutSection from "../../components/aboutSection/AboutSection";
import Footer from "../../components/footer/Footer";
import Hero from "../../components/hero/Hero";
import LogoSlider from "../../components/logo-slider/LogoSlider";
import Navbar from "../../components/navbar/Navbar";
import Offer from "../../components/offerSection/Offer";
import ProductSection from "../../components/productSection/ProductSection";
import ReviewSection from "../../components/reviewSection/ReviewSection";
import Services from "../../components/services/Services";

export default function Home() {
    return(
         <div className="position-relative">
              <main className="vh-100">
              <Hero />
              </main>
              <Services/>
              <ProductSection/>
              <Offer/>
              <ReviewSection/>
              <AboutSection/>
              <LogoSlider/>
              {/* <Footer/> */}
            </div>
    )
}