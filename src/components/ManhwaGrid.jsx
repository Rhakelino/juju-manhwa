import React, { useState } from 'react';
import ManhwaCard from './ManhwaCard';
import ManhwaModal from './ManhwaModal';

function ManhwaGrid({ manhwaList, showLoadMore = false, onLoadMore, hasMore = false, isLoading = false }) {
  const [selectedManhwa, setSelectedManhwa] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (manhwa) => {
    setSelectedManhwa(manhwa);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {manhwaList.map((item, index) => (
          <ManhwaCard
            key={`${item.id}-${index}`}
            title={item.title}
            cover={item.coverImage}
            rating={item.rating}
            chapters={item.chapters}
            genres={item.genres}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </div>
      
      {/* Modal Component */}
      <ManhwaModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        manhwa={selectedManhwa} 
      />
      
      {showLoadMore && hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default ManhwaGrid;