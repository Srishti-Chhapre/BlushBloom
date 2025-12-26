import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "../assets/slide1.jpg";
import image2 from "../assets/slide2.jpg";
import image3 from "../assets/slide3.jpg";
import image4 from "../assets/slide4.jpg";

const slides = [
  {
    id: 1,
    src: image1,
    firstLineText: "🌸 Make Every Moment Bloom",
    secondLineText: "with Fresh Flowers from",
    brand: '" BlushBloom "',
  },
  { id: 2, src: image2, alt: "🌼 Trendy Bouquets for Every Occasion" },
  { id: 3, src: image3, alt: "🌹 Discover the Freshest Picks Today" },
  { id: 4, src: image4, alt: "🌷 Exclusive Floral Deals Just for You" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(1); // Start at the first real slide
  const [isAnimating, setIsAnimating] = useState(true);
  const slideRef = useRef(null);

  const length = slides.length;

  // Cloning first and last slide to create infinite loop
  const extendedSlides = [
    slides[slides.length - 1], // Clone of last slide at the beginning
    ...slides,
    slides[0], // Clone of first slide at the end
  ];

  const nextSlide = () => {
    setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrent((prev) => prev - 1);
  };

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Loop handling logic
  useEffect(() => {
    if (current === extendedSlides.length - 1) {
      // If we reach the clone of the first slide
      setTimeout(() => {
        setIsAnimating(false);
        setCurrent(1); // Instantly jump to the first real slide
      }, 700); // Match the transition duration
    } else if (current === 0) {
      // If we reach the clone of the last slide
      setTimeout(() => {
        setIsAnimating(false);
        setCurrent(length); // Instantly jump to the last real slide
      }, 700);
    } else {
      setIsAnimating(true);
    }
  }, [current, extendedSlides.length, length]);

  return (
    <div className="relative overflow-hidden">

      {/* Slider Track */}
      <div
        ref={slideRef}
        className={`flex ${isAnimating ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {extendedSlides.map((slide, index) => (
          <div key={index} className="min-w-full relative">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full object-cover herosectionImgHeight"
            />

            {/* Slide Text */}
            <div className="absolute top-24 left-14 w-5/6 transform  px-4 py-2 rounded-full text-gray-800 herosectionFontFamily">
              {slide.id === 1 ? (
                <>
                  <div>{slide.firstLineText}</div>
                  <div>{slide.secondLineText}</div>
                  <div className="text-pink-500 font-bold">{slide.brand}</div>
                </>
              ) : (
                <div>{slide.alt}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => prevSlide()}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full z-20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => nextSlide()}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full z-20"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default HeroSection;
