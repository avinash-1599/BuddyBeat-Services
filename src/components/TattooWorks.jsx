import React from 'react';

const TattooWorks = () => {
  return (
    <div className="bg-gray-400 from-white to-gray-100 py-12 px-6 md:px-16 text-gray-800">
      
      {/* Section: How Tattoo Works */}
      <section className="mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 inline-block">
          How Tattoos Work
        </h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            Tattoos are a form of body art created by inserting ink into the skin's dermis layer. A tattoo machine punctures the skin with fine needles to deposit ink precisely.
          </p>
          <p>
            Healing typically takes 2–3 weeks. During this period, the tattoo will scab, peel, and gradually settle into the skin. Proper aftercare is crucial for preserving color and preventing infection.
          </p>
          <p>
            Choosing a reputable artist and hygienic studio ensures both the safety and the long-term beauty of your tattoo.
          </p>
        </div>
      </section>

      {/* Section: Our Services */}
      <section>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 inline-block">
          Our Services
        </h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            At <span className="text-pink-600 font-semibold">BuddyBeat</span>, we connect you with top-rated tattoo artists in your area. Whether you're looking for a minimalist symbol or a full sleeve masterpiece, we make it effortless to book appointments with trusted professionals.
          </p>
          <p>
            Enjoy a smooth booking experience, custom consultations tailored to your vision, and expert aftercare support. We're committed to delivering quality and comfort.
          </p>
          <p>
            Explore our curated list of artists and get started on your tattoo journey with confidence and style.
          </p>
        </div>
      </section>

    </div>
  );
};

export default TattooWorks;
