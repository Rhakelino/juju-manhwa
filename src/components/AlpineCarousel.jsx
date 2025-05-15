// AlpineCarousel.jsx
import { useEffect, useRef } from 'react';

export default function AlpineCarousel({ manhwaList }) {
  const carouselRef = useRef(null);
  
  // Setup Alpine data on mount
  useEffect(() => {
    if (!carouselRef.current) return;
    
    // Get the top level element
    const el = carouselRef.current;
    
    // Setup Alpine data
    el._x_dataStack = [];
    
    // This needs to happen after Alpine is loaded and in the next tick
    // to ensure Alpine can properly initialize the element
    setTimeout(() => {
      if (window.Alpine) {
        window.Alpine.initTree(el);
      }
    }, 0);
    
    return () => {
      // Cleanup when component unmounts
      if (el._x_dataStack) {
        delete el._x_dataStack;
      }
    };
  }, [manhwaList]);

  return (
    <div 
      ref={carouselRef}
      className="relative w-full h-[400px] mb-12 rounded-lg overflow-hidden border border-gray-800 group"
      data-carousel
    >
      {/* Alpine.js initialization div */}
      <div
        data-x-data={`{
          activeSlide: 0,
          slides: ${JSON.stringify(manhwaList.map(m => m.id))},
          autoplayTimer: null,
          
          nextSlide() {
            this.activeSlide = (this.activeSlide + 1) % this.slides.length;
          },
          
          prevSlide() {
            this.activeSlide = (this.activeSlide - 1 + this.slides.length) % this.slides.length;
          },
          
          goToSlide(index) {
            this.activeSlide = index;
          },
          
          startAutoplay() {
            this.autoplayTimer = setInterval(() => {
              this.nextSlide();
            }, 5000);
          },
          
          stopAutoplay() {
            if (this.autoplayTimer) clearInterval(this.autoplayTimer);
          }
        }`}
        data-x-init="startAutoplay()"
        data-x-on:mouseenter="stopAutoplay()"
        data-x-on:mouseleave="startAutoplay()"
        className="h-full relative"
      >
        {/* Slides */}
        {manhwaList.map((manhwa, index) => (
          <div 
            key={manhwa.id}
            data-x-show={`activeSlide === ${index}`}
            data-x-transition:enter="transition ease-out duration-300"
            data-x-transition:enter-start="opacity-0 transform translate-x-full"
            data-x-transition:enter-end="opacity-100 transform translate-x-0"
            data-x-transition:leave="transition ease-in duration-300"
            data-x-transition:leave-start="opacity-100 transform translate-x-0"
            data-x-transition:leave-end="opacity-0 transform -translate-x-full"
            className="absolute inset-0"
            style={{display: index === 0 ? 'block' : 'none'}} // Default display for first slide
          >
            <img
              src={manhwa.coverImage}
              alt={manhwa.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1200x400?text=No+Cover+Available';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-8">
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
        ))}

        {/* Navigation Arrows */}
        <button 
          data-x-on:click="prevSlide()"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button 
          data-x-on:click="nextSlide()"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 right-8 flex space-x-2 z-20">
          {manhwaList.map((_, i) => (
            <button 
              key={i} 
              data-x-on:click={`goToSlide(${i})`}
              className="w-2.5 h-2.5 rounded-full transition-all bg-gray-600 hover:bg-gray-500"
              data-x-bind:class={`activeSlide === ${i} ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-500 w-2.5'`}
              aria-label={`Go to slide ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}