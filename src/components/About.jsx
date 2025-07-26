import NavBar from "./Navbar";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="bg-gray-700 text-white min-h-screen pt-20 pb-[180px]">
      {/* Fixed NavBar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            About <span className="text-orange-400">BuddyBeat Services</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We are revolutionizing how local services connect with people. From tattoos to home cleaning,
            BuddyBeat empowers users and service providers through smart, fast, and flexible solutions.
          </p>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              Our mission is to make everyday services accessible and seamless. Whether you want a custom tattoo,
              a salon session at home, or tutoring for your child — we bring the best to your doorstep, using
              technology to simplify the experience.
            </p>
          </div>
          <img
            src="/aboutus.jpg"
            alt="Our Mission"
            className="rounded-xl shadow-lg w-full h-72 object-cover"
          />
        </div>

        {/* Core Values or Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-yellow-400 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Verified Professionals",
                desc: "All service providers go through a strict verification and rating system.",
                icon: "✅",
              },
              {
                title: "Seamless Booking",
                desc: "Book appointments with just a few clicks. Real-time chat included.",
                icon: "📲",
              },
              {
                title: "Quality & Trust",
                desc: "Our platform ensures high-quality service and transparency for both users and providers.",
                icon: "🌟",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">
            Ready to experience effortless services?
          </h3>
          <p className="text-gray-400 mb-6">Join thousands of happy users and get started today.</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-full transition"
          >
            Explore Services
          </a>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <Footer />
      </div>
    </div>
  );
};

export default About;
