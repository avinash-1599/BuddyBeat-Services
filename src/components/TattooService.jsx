import NavBar from "./Navbar";
import Footer from "./Footer";
import TattooWorks from "./TattooWorks";
import TattooGallery from "./TattooGallery";
import { Outlet, useLocation, useNavigate } from "react-router-dom"; // Assuming routing is used

const TattooService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showModal = location.pathname === "/book-appointment" || location.pathname === "/register-artist";

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Fixed NavBar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>

      {/* Scrollable Content */}
      <div className="pt-16 pb-20 overflow-y-auto max-h-screen">
        <main className="text-center px-4 py-10">
          <p className="text-2xl md:text-3xl font-bold drop-shadow-lg">
            <span className="bg-gradient-to-r from-amber-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Tattoo Appointment
            </span>
          </p>
          <p className="text-sm md:text-base text-gray-300 mt-3">
            Discover top-tier tattoo experiences at your fingertips.
          </p>

          {/* Book Appointment Button */}
          <button
            onClick={() => navigate("/book-appointment")}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white font-semibold text-sm md:text-base rounded-full shadow-md hover:scale-105 transition-all"
          >
            Book Appointment
          </button>
          <button
            onClick={() => navigate("/register-artist")}
            className="mt-6 ml-3 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white font-semibold text-sm md:text-base rounded-full shadow-md hover:scale-105 transition-all"
            >
            Register as Tattoo Artist
          </button>
        </main>

        <TattooGallery />
        <TattooWorks />
      </div>
        
        {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[60] flex justify-center items-center overflow-auto p-4">
          <div className="bg-white p-6 rounded max-w-lg w-full relative">
            <Outlet />
            {/* Close Button */}
            <button
              onClick={() => window.history.back()}
              className="absolute top-2 right-2 text-black hover:text-red-600 text-xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
        )}

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <Footer />
      </div>
    </div>
  );
};

export default TattooService;
