import { useState } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";

const Faqs = () => {
  const faqs = [
    {
      question: "How do I book a service?",
      answer:
        "You can easily book any service by navigating to the service page, choosing your preferences, and confirming the appointment. No login required!",
    },
    {
      question: "Is there a way to negotiate pricing?",
      answer:
        "Yes! For services like tattoos, our platform provides a live price negotiation chat between you and the service provider before confirming.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "No account is needed. You only need to provide a valid mobile number to connect with service providers and receive updates.",
    },
    {
      question: "How are service providers verified?",
      answer:
        "All providers go through a strict verification process, including identity checks, reviews, and quality assurance ratings.",
    },
    {
      question: "Can I schedule a service in advance?",
      answer:
        "Absolutely! You can choose a preferred date and time while filling out the service request form.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-20 pb-[180px]">
      {/* Fixed NavBar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-10">Frequently Asked Questions</h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 shadow-md transition hover:shadow-lg cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <p className="mt-3 text-gray-400 text-sm">{faq.answer}</p>
              )}
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

export default Faqs;
