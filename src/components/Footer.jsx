const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Brand/Intro */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">BuddyBeat Services</h2>
          <p className="text-sm text-gray-400">
            Book appointments with top professionals near you for tattoos. Fast, easy, and reliable.
          </p>
        </div>

        {/* Explore Links */}
        <div className="ml-10">
          <h3 className="text-md font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/services" className="hover:text-white transition">Our Services</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/faqs" className="hover:text-white transition">FAQs</a></li>
          </ul>
        </div>

        {/* Booking Help */}
        <div>
          <h3 className="text-md font-semibold text-white mb-3">Need Help?</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/support" className="hover:text-white transition">Customer Support</a></li>
            <li><a href="/booking-policy" className="hover:text-white transition">Booking Policy</a></li>
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-md font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-sm text-gray-400">Email: buddybeat.co.in@gmail.com</p>
          <p className="text-sm text-gray-400">Phone: +91 8369725189</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-5 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BuddyBeat Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;