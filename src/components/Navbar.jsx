import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "../utils/userSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const user = useSelector((store) => store.user?.userInfo);
  console.log("User in NavBar:", user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
        console.log("Logged in user:", data);
        dispatch(setUser(data.data));
      } catch (err) {
        console.log("Not logged in");
        // redirect to main login page
        window.location.href =
          "https://www.buddybeat.co.in/login?redirect=https://services.buddybeat.co.in";
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate(`${BASE_URL}/login`);
    } catch (err) {
      console.error("Error logging out", err);
    }
  }

  return (
    <nav className="bg-gray-800 text-white flex items-center justify-between px-6 py-3 shadow-md z-50 relative">
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="logo" className="h-8 w-8" />
        <Link to={"/"} className="text-xl font-bold hover:text-gray-300">
          <span className="bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 bg-clip-text text-transparent text-4xl">
            BuddyBeat
          </span>{" "}
          <span className="bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 bg-clip-text text-transparent text-4xl">
            Services
          </span>
        </Link>
      </div>

      <div>
        <ul className="flex space-x-8 relative">
          <li
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="hover:text-gray-300 transition">Services</button>
            {showDropdown && (
              <ul className="absolute top-full left-0 bg-white text-black shadow-md rounded w-48 p-1 space-y-1 z-50">
                <li className="hover:bg-gray-100 p-1 cursor-pointer" onClick={() => navigate('/tattoo-services')}>Tattoo Appointment</li>
                <li className="hover:bg-gray-100 p-1 cursor-pointer" onClick={() => navigate('/house-cleaning-services')}>House Cleaning</li>
                <li className="hover:bg-gray-100 p-1 cursor-pointer" onClick={() => navigate('/salon-services')}>Salon Services</li>
                <li className="hover:bg-gray-100 p-1 cursor-pointer" onClick={() => navigate('/home-tution-services')}>Home Tution</li>
              </ul>
            )}
          </li>
          <li>
            <Link to={"/about"} className="hover:text-gray-300 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link to={"/faqs"} className="hover:text-gray-300 transition">
              FAQs
            </Link>
          </li>
          <li
            className="relative"
            onMouseEnter={() => setShowProfileDropdown(true)}
            onMouseLeave={() => setShowProfileDropdown(false)}
          >
            <button className="flex items-center space-x-2 focus:outline-none">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                <img src={user.photoUrl} alt="user photo" className="w-full h-full object-cover" />
              </div>
            </button>
            {showProfileDropdown && (
              <ul className="absolute top-full left-0 bg-white text-black shadow-md rounded w-48 p-1 space-y-1 z-50">
                <li className="hover:bg-gray-100 p-1 cursor-pointer" onClick={handleLogout}>Log Out</li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
