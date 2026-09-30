import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useMatch, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { links } from './links';

export default function Navbar() {
    const location = useLocation();
    const { pathname } = useLocation();
    const match = useMatch('/contact');
    const matchNz = useMatch('/news');
    const navigate = useNavigate();

    const [activeUser, setActiveUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const checkUser = () => {
        const user = JSON.parse(localStorage.getItem('fruitkha_active_user'));
        setActiveUser(user);
    };

    useEffect(() => {
        checkUser();
        // Listen to storage events to update state instantly on login/logout
        window.addEventListener('storage', checkUser);
        return () => {
            window.removeEventListener('storage', checkUser);
        };
    }, []);

    useEffect(() => {
        const closeDropdown = (e) => {
            if (!e.target.closest('.user-menu-container')) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('fruitkha_active_user');
        setActiveUser(null);
        setShowDropdown(false);
        navigate('/');
    };

    const sendData=()=>{
        fetch('http://localhost:5000/add/itm',{
            method:"POST",
            headers:{"content-type":"application/json"},
            body: JSON.stringify({
                user:"test001"
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data);
        })
    }

    return (
        <nav className={`${pathname === '/' ? '' : 'dark-nav'} w-100 d-flex justify-content-between align-items-center `}>
            <div className="logo">
                <img src={logo} alt="fruitkha-logo" />
            </div>
            <div id="navbar" className="w-50">
                <ul className="nav">

                    {links.map((link, ind) => (
                        <li key={ind} className="nav-item">
                            {/* <Link 
                                to={link.to} 
                                id={location.pathname === link.to ? "active" : ""} className="nav-link " 
                                 >{link.name}
                                </Link> */}
                              <NavLink 
                                to={link.to} // to='/about' 
                                style={ //({isActive})=> condition ? true : false
                                    ({isActive})=> isActive? 
                                    {color:"#f28123"}:{color:"white"} 
                                }
                                // className='nav-link'
                                className={({isActive})=>{ 
                                   return`${ isActive? 'active':''} nav-link ` 
                                }}  
                                >{link.name} </NavLink>
                        </li>
                    ))}

                </ul>
            </div>
            <div id="navIcon" className="w-25 d-flex align-items-center justify-content-end pe-5">
                <i className="fa-solid fa-cart-shopping" style={{ cursor: 'pointer' }}></i> 
                <i className="fa-solid fa-magnifying-glass ms-4" style={{ cursor: 'pointer' }}></i>
                
                {activeUser ? (
                    <div className="user-menu-container ms-4">
                        <button className="user-profile-btn" onClick={() => setShowDropdown(!showDropdown)}>
                            <div className="user-avatar">
                                {activeUser.name ? activeUser.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                        </button>
                        <div className={`user-dropdown ${showDropdown ? 'show' : ''}`}>
                            <div className="px-3 py-2 text-white border-bottom border-secondary" style={{ fontSize: '0.85rem' }}>
                                <div className="fw-bold text-truncate">{activeUser.name}</div>
                                <div className="text-muted text-truncate" style={{ fontSize: '0.75rem' }}>{activeUser.email}</div>
                            </div>
                            <button className="user-dropdown-item text-danger" onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link to="/login" className="ms-4 text-white" style={{ fontSize: '1.2rem' }} title="Login / Register">
                        <i className="fa-regular fa-user"></i>
                    </Link>
                )}
            </div>
        </nav>
    )
}