import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {

    const navigate = useNavigate();

    return (
        <nav className="bg-gray-800 text-white flex items-center justify-between px-6 py-3 shadow-md z-50">
            {/* Left Section - Logo & Brand */}
            <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="logo" className="h-8 w-8" />
                <Link to={"/"} className="text-xl font-bold hover:text-gray-300">
                <span className="bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 bg-clip-text text-transparent text-4xl">
                    {'BuddyBeat '}
                </span>
                <span className="bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 bg-clip-text text-transparent text-4xl">
                    Services
                </span>
                </Link>
            </div>

            <div>
                <ul className="flex space-x-8">
                    <li>
                        <Link to={"/services"} className="hover:text-gray-300 transition">Services</Link>
                    </li>
                    <li>
                        <Link to={"/about"} className="hover:text-gray-300 transition">About Us</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;