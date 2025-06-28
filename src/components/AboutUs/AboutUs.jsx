import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Ananya Sharma",
    comment: "BlushBloom always delivers fresh and beautiful flowers. Their service is excellent and timely.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    comment: "I ordered flowers for my parents’ anniversary and they were absolutely delighted. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Priya Singh",
    comment: "Their wedding bouquets are gorgeous! BlushBloom made my special day even more beautiful.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const AboutUs = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 bg-pink-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">About BlushBloom</h1>

      {/* About Section */}
      <div className="max-w-4xl mx-auto  p-8 rounded-lg shadow">
        <p className="text-gray-700 text-lg mb-6">
          Welcome to <span className="text-pink-500 font-bold">BlushBloom</span> — where flowers bloom, memories are created, and love is celebrated.
        </p>

        <p className="text-gray-700 text-lg mb-6">
          At BlushBloom, we offer a wide range of hand-picked flowers and curated arrangements for every occasion. Whether it’s a worship ceremony, birthday, wedding, corporate event, or simply a surprise for someone special — we have something to brighten your day.
        </p>

        <p className="text-gray-700 text-lg mb-6">
          Our mission is to deliver the freshest flowers with a seamless, joyful shopping experience. Every order is crafted with love and care by our talented florists, ensuring that your moments are cherished forever.
        </p>

        <p className="text-gray-700 text-lg mb-6">
          We proudly serve thousands of happy customers and aim to make your celebrations bloom with unmatched beauty and fragrance.
        </p>

        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold mb-2">Customer Ratings</h2>
          <div className="flex justify-center text-yellow-400 text-3xl mb-4">
            ★★★★☆
          </div>
          <p className="text-gray-600">4.5 / 5 based on 500+ happy customers</p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-12">
        <h2 className="text-center text-2xl font-bold text-pink-600 mb-6">What Our Customers Say</h2>

        <div className="relative max-w-3xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg h-72">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((testimonial, idx) => (
              <div key={testimonial.id} className="min-w-full flex flex-col items-center justify-center px-8 py-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg transform transition-transform duration-700 ease-in-out scale-100 hover:scale-105"
                />
                <p className="text-gray-700 mb-2 italic text-center max-w-lg transition-opacity duration-700 ease-in-out">
                  "{testimonial.comment}"
                </p>
                <h3 className="text-pink-500 font-bold">{testimonial.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
