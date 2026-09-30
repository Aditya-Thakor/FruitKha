import logo1 from '../../assets/images/logos/1.png';
import logo2 from '../../assets/images/logos/2.png';
import logo3 from '../../assets/images/logos/3.png';
import logo4 from '../../assets/images/logos/4.png';
import logo5 from '../../assets/images/logos/5.png';

export default function LogoSlider() {
    return (
        <div id="logo" class="carousel slide mt-5 border" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="logo-group">
                        <img src={logo1} alt="Logo 1" />
                        <img src={logo2} alt="Logo 2" />
                        <img src={logo3} alt="Logo 3" />
                        <img src={logo4} alt="Logo 4" />
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="logo-group">
                        <img src={logo5} alt="Logo 5" />
                        <img src={logo1} alt="Logo 1" />
                        <img src={logo2} alt="Logo 2" />
                        <img src={logo3} alt="Logo 3" />
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="logo-group">
                        <img src={logo3} alt="Logo 3" />
                        <img src={logo4} alt="Logo 4" />
                        <img src={logo5} alt="Logo 5" />
                        <img src={logo1} alt="Logo 1" />
                    </div>
                </div>
            </div>
        </div>
    )
}