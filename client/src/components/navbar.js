import {Link} from 'react-router-dom';
import './navbar.css';


const Navbar = () => {

    return (
        <div className="navbar">
            <div className="navitems">
                <div className="nav-item">
                    <Link to="/" className="item">
                        News
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;