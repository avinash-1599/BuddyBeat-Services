import NavBar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const serviceList = [
    {
      title: "Tattoo Services",
      description: "Get inked by professional artists near you.",
      route: "/tattoo-services",
      icon: "🧑‍🎨",
    },
    {
      title: "House Cleaning",
      description: "Affordable home cleaning at your convenience.",
      route: "/house-cleaning-services",
      icon: "🧹",
    },
    {
      title: "Salon at Home",
      description: "Hair, beauty & grooming at your doorstep.",
      route: "/salon-services",
      icon: "💇‍♀️",
    },
    {
      title: "Home Tuition",
      description: "Expert tutors for school and competitive exams.",
      route: "/home-tution-services",
      icon: "📚",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white min-h-screen pt-20 pb-20">
      {/* Fixed NavBar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Explore Our Services</h1>
        <p className="text-center text-gray-300 mb-10">
          We bring top-notch services to your doorstep. Choose what you need and connect instantly.
        </p>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceList.map((service, index) => (
            <div
              key={index}
              onClick={() => navigate(service.route)}
              className="cursor-pointer bg-gray-800 hover:bg-gray-700 transition rounded-2xl p-6 shadow-lg text-center"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-sm text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <Footer />
      </div>
    </div>
  );
};

export default Services;
