// HeroCarousel.jsx
import { useEffect, useState, useRef } from "react";

function HeroCarousel({ manhwaList }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const intervalRef = useRef(null);

  // Add new state variables for swipe functionality
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const carouselRef = useRef(null);

  // Handle auto-sliding
  useEffect(() => {
    // Start auto-slide
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % manhwaList.length);
    }, 5000);

    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [manhwaList.length]);

  // Pause auto-slide on hover
  const pauseAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Resume auto-slide on mouse leave
  const resumeAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % manhwaList.length);
    }, 5000);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % manhwaList.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + manhwaList.length) % manhwaList.length);
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  // Mouse swipe handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    pauseAutoplay();

    // Prevent default behavior to avoid text selection during swipe
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
    e.preventDefault();
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;

    const swipeDistance = currentX - startX;
    const minSwipeDistance = 50; // Minimum distance to trigger slide change

    if (swipeDistance > minSwipeDistance) {
      // Swiped right, go to previous slide
      prevSlide();
    } else if (swipeDistance < -minSwipeDistance) {
      // Swiped left, go to next slide
      nextSlide();
    }

    // Reset swipe state
    setIsDragging(false);
    resumeAutoplay();
  };

  // Handle case when mouse leaves the carousel while dragging
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
    resumeAutoplay();
  };

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-[400px] mb-12 rounded-lg overflow-hidden border border-gray-800 group"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Slides Container */}
      <div className="h-full relative">
        {/* Map through slides */}
        {manhwaList.map((manhwa, index) => (
          <div
            key={manhwa.id}
            className={`absolute inset-0 transition-opacity duration-500 ${index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            {/* Mobile Layout - Visible pada tampilan mobile, hidden pada desktop */}
            <div className="md:hidden h-full w-full relative">
              <img
                src={manhwa.coverImage}
                alt={manhwa.title}
                className="w-full h-full object-cover"
                draggable="false"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/1200x400?text=No+Cover+Available';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-4">
                {/* Genre Badge */}
                {manhwa.genres && manhwa.genres.length > 0 && (
                  <span className="text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full mb-2 w-fit">
                    {manhwa.genres[0]}
                  </span>
                )}

                {/* Title and Description - Mobile Version */}
                <h2 className="text-white text-2xl font-bold mb-1">{manhwa.title}</h2>
                <p className="text-gray-300 mb-3 max-w-xl line-clamp-2 text-sm">{manhwa.description}</p>

                {/* Stats Bar - Mobile Version */}
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-white">{manhwa.rating}</span>
                  </div>
                  <div className="text-gray-400">|</div>
                  <div className="text-gray-300">Ch. {manhwa.chapters}</div>
                  <div className="text-gray-400">|</div>
                  <div className="text-gray-300">{manhwa.status === "completed" ? "Completed" : "Ongoing"}</div>
                </div>

                {/* Action Buttons - Mobile Version */}
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-full hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-900/30 font-medium">
                    Read Now
                  </button>
                  <button className="px-4 py-2 bg-gray-800/80 backdrop-blur-sm text-white text-sm rounded-full hover:bg-gray-700/80 transition-all border border-gray-700/50 font-medium">
                    <svg className="w-4 h-4 inline-block mr-1 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Split View - Hidden pada mobile, visible pada desktop */}
            <div className="hidden md:flex h-full w-full">
              {/* Bagian Kiri - Gambar */}
              <div className="h-full w-[320px] flex-shrink-0 relative">
                <img
                  src={manhwa.coverImage}
                  alt={manhwa.title}
                  className="h-full w-full object-contain"
                  draggable="false"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/320x400?text=No+Cover+Available';
                  }}
                />
                {/* Overlay gradasi untuk blend ke bagian kanan */}
                <div className="absolute top-0 right-0 h-full w-[30px] bg-gradient-to-r from-transparent to-black/90"></div>
              </div>

              {/* Bagian Kanan - Area Gradasi dengan Konten */}
              <div className="flex-grow h-full relative bg-gradient-to-r from-black/90 to-gray-900 flex flex-col justify-end p-8">
                {/* Genre Badge */}
                {manhwa.genres && manhwa.genres.length > 0 && (
                  <span className="text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full mb-4 w-fit">
                    {manhwa.genres[0]}
                  </span>
                )}

                {/* Title and Description */}
                <h2 className="text-white text-4xl font-bold mb-2">{manhwa.title}</h2>
                <p className="text-gray-300 mb-6 max-w-xl line-clamp-3 text-lg">{manhwa.description}</p>

                {/* Stats Bar */}
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-white">{manhwa.rating}</span>
                  </div>
                  <div className="text-gray-400">|</div>
                  <div className="text-gray-300">Ch. {manhwa.chapters}</div>
                  <div className="text-gray-400">|</div>
                  <div className="text-gray-300">{manhwa.status === "completed" ? "Completed" : "Ongoing"}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-900/30 font-medium">
                    Read Now
                  </button>
                  <button className="px-6 py-2.5 bg-gray-800/80 backdrop-blur-sm text-white rounded-full hover:bg-gray-700/80 transition-all border border-gray-700/50 font-medium">
                    <svg className="w-5 h-5 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    Add to Library
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 right-8 flex space-x-2 z-20">
        {manhwaList.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`h-2.5 rounded-full transition-all ${i === activeSlide ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-500 w-2.5'
              }`}
            aria-label={`Go to slide ${i + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;