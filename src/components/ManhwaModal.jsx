import React from 'react';

const ManhwaModal = ({ isOpen, onClose, manhwa }) => {
  if (!isOpen || !manhwa) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-gradient-to-b from-gray-900 to-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full max-h-[90vh] w-full mx-4">
          <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
            {/* Image section - improved for mobile */}
            <div className="md:w-1/3 flex-shrink-0 h-[200px] md:h-auto">
              <img
                src={manhwa.coverImage}
                alt={manhwa.title}
                className="w-full h-full object-cover md:h-[500px] md:max-h-[90vh]"
              />
            </div>

            {/* Content section */}
            <div className="md:w-2/3 p-4 md:p-6 flex flex-col overflow-hidden">
              <div className="flex justify-between items-start">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 pr-8">{manhwa.title}</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white absolute top-4 right-4"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              {/* Rating and status - more responsive */}
              <div className="flex flex-wrap items-center mb-3 gap-2">
                <div className="flex items-center mr-2">
                  <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="text-white font-medium">{manhwa.rating}</span>
                </div>
                <div className="px-2 py-1 bg-blue-900/40 border border-blue-800 rounded-full text-xs text-blue-300 font-medium">
                  {manhwa.status || 'Unknown'}
                </div>
                <div className="text-gray-400 text-sm">
                  {manhwa.chapters} chapters
                </div>
              </div>

              {/* Authors */}
              {manhwa.authors && (
                <div className="mb-2">
                  <span className="text-gray-400 text-sm">Authors: </span>
                  <span className="text-white text-sm">{manhwa.authors}</span>
                </div>
              )}

              {/* Genres - improved for mobile */}
              {manhwa.genres && manhwa.genres.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {manhwa.genres.map((genre, index) => (
                      <span key={index} className="px-2 py-0.5 bg-gray-800 rounded-full text-xs text-gray-300 mb-1">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description - responsive height */}
              <div className="mt-2 flex-grow overflow-hidden border-l-4 border-blue-500 border-opacity-70 bg-gray-800 p-2 md:p-3 rounded-lg">
                <h4 className="text-white font-medium mb-1 md:mb-2">Synopsis</h4>
                <div className="overflow-y-auto max-h-[120px] md:max-h-[200px] pr-2 scrollbar-hide">
                  <p className="text-gray-300 text-xs md:text-sm">
                    {manhwa.description || "No description available."}
                  </p>
                </div>
              </div>

              {/* Button row - full width on mobile */}
              <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-medium transition-all shadow-lg shadow-blue-900/20 text-sm md:text-base">
                  Read Now
                </button>
                <button className="px-4 py-2 border border-blue-600 text-blue-400 hover:text-blue-300 hover:border-blue-500 rounded-full font-medium transition-all flex items-center justify-center text-sm md:text-base">
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add to Library
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this CSS at the top of your component file or in your global CSS
const scrollbarHideStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

// Add the styles to the document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = scrollbarHideStyles;
  document.head.appendChild(styleSheet);
}

export default ManhwaModal;