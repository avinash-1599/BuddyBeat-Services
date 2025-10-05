import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

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
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
