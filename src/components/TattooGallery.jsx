import React from 'react';

// You can replace these with real image URLs
const tattooImages = [
  "/tattoo/tattoo1.jpg",
  "/tattoo/tattoo2.webp",
  "/tattoo/tattoo3.webp",
  "/tattoo/tattoo4.webp",
  "/tattoo/tattoo5.jpg",
  "/tattoo/tattoo6.jpg",
  "/tattoo/tattoo7.jpg",
  "/tattoo/tattoo8.jpg",
];

const TattooGallery = () => {
  return (
    <section className="py-10 px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Tattoo Artworks by Professionals
      </h2>

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {tattooImages.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-64 h-80 rounded-lg overflow-hidden shadow-lg border border-gray-700 bg-gray-800">
            <img
              src={src}
              alt={`Tattoo ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TattooGallery;
