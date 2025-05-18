import { useEffect, useRef } from 'react';

function ManhwaModal({ manhwa, onClose }) {
  const modalRef = useRef(null);

  // Same event handlers for closing...
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.body.style.overflow = 'hidden';
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    function handleEscKey(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  // CSS for hiding scrollbar
  const hideScrollbarStyle = `
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;

  if (!manhwa) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <style>{hideScrollbarStyle}</style>
      <div 
        ref={modalRef}
        className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl border border-gray-700/50 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        {/* Image Section with gradient overlay */}
        <div className="md:w-2/5 relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
          <img
            src={manhwa.coverImage}
            alt={manhwa.title}
            className="w-full h-80 md:h-full object-cover transition-transform duration-300 md:group-hover:scale-95 md:group-hover:rounded-sm"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
            }}
          />
          <div className="absolute top-4 right-4 md:hidden z-20">
            <button 
              onClick={onClose}
              className="bg-black/60 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/80"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          {/* Rating badge floating on image */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center z-20">
            <svg className="w-4 h-4 text-yellow-400 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-white font-semibold">{manhwa.rating}</span>
          </div>
        </div>
        
        {/* Content Section - Hidden scrollbar but still scrollable */}
        <div className="flex-1 p-8 overflow-y-auto hide-scrollbar">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">{manhwa.title}</h2>
              
              {/* Author with icon */}
              {manhwa.authors && (
                <div className="flex items-center text-gray-300">
                  <svg className="w-4 h-4 mr-2 opacity-70" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                  <p className="text-sm">
                    {manhwa.authors}
                  </p>
                </div>
              )}
              
              {/* Genre badges with improved design */}
              <div className="flex flex-wrap gap-2 pt-1">
                {manhwa.genres && manhwa.genres.map((genre, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-medium px-3 py-1 rounded-md"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Close button - desktop */}
            <div className="hidden md:block">
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/60 rounded-full p-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Stats with improved design */}
          <div className="flex items-center gap-5 mt-6 mb-6 text-sm bg-gray-800/30 rounded-lg p-3 border border-gray-700/40">
            <div className="text-gray-300 flex items-center">
              <svg className="w-4 h-4 text-gray-400 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
              </svg>
              <span>Ch. {manhwa.chapters}</span>
            </div>
            <div className="text-gray-300 flex items-center">
              <svg className="w-4 h-4 text-gray-400 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
              <span className="capitalize">
                {manhwa.status === "completed" ? "Completed" : "Ongoing"}
              </span>
            </div>
          </div>
          
          {/* Description with improved design */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              Synopsis
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed bg-gray-800/20 p-4 rounded-lg border-l-4 border-blue-500/50">
              {manhwa.description || "No description available."}
            </p>
          </div>
          
          {/* Action Buttons with improved design */}
          <div className="flex gap-4 mt-6">
            <button className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-500 hover:to-indigo-600 transition-all shadow-lg shadow-blue-900/30 font-medium flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
              Read Now
            </button>
            <button className="flex-1 px-5 py-3 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-700/80 transition-all border border-gray-700/50 font-medium flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              Add to Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManhwaModal;