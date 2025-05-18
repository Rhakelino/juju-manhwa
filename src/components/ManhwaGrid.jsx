// ManhwaGrid.jsx dengan support load more eksternal
import { useState, useEffect } from 'react';
import ManhwaCard from './ManhwaCard';
import ManhwaModal from './ManhwaModal';

function ManhwaGrid({ 
  manhwaList, 
  showLoadMore = false, 
  onLoadMore = null,  // Callback dari parent
  hasMore = null,     // Kontrol dari parent (optional)
  isLoading = false   // Loading state dari parent (optional)
}) {
  const [selectedManhwa, setSelectedManhwa] = useState(null);
  const [visibleItems, setVisibleItems] = useState(10);
  const [internalHasMore, setInternalHasMore] = useState(true);
  
  // Reset state saat list berubah
  useEffect(() => {
    if (!onLoadMore) { // Hanya gunakan internal pagination jika tidak ada external callback
      setVisibleItems(10);
      setInternalHasMore(manhwaList.length > 10);
    }
  }, [manhwaList, onLoadMore]);
  
  // Buka modal
  const openModal = (manhwa) => {
    setSelectedManhwa(manhwa);
  };
  
  // Tutup modal
  const closeModal = () => {
    setSelectedManhwa(null);
  };
  
  // Handler load more internal
  const handleInternalLoadMore = () => {
    const newVisibleItems = visibleItems + 10;
    setVisibleItems(newVisibleItems);
    
    if (newVisibleItems >= manhwaList.length) {
      setInternalHasMore(false);
    }
  };
  
  // Tentukan apakah masih ada data (internal atau external control)
  const shouldShowLoadMore = showLoadMore && 
    (onLoadMore ? (hasMore !== null ? hasMore : true) : internalHasMore);
  
  // Gunakan data sesuai mode pagination (internal atau external)
  const displayedManhwaList = onLoadMore ? manhwaList : manhwaList.slice(0, visibleItems);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayedManhwaList.map((item) => (
          <ManhwaCard
            key={item.id}
            title={item.title}
            cover={item.coverImage}
            rating={item.rating}
            chapters={item.chapters}
            genres={item.genres}
            onClick={() => openModal(item)}
          />
        ))}
      </div>
      
      {/* Load More Button */}
      {shouldShowLoadMore && (
        <div className="flex justify-center mt-8">
          <button 
            className={`px-6 py-2.5 bg-gray-800 border border-gray-700 text-gray-300 rounded-full hover:bg-gray-700 transition-all flex items-center gap-2 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            onClick={onLoadMore || handleInternalLoadMore}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Load More</span>
                {!onLoadMore && (
                  <span className="text-xs text-gray-400">
                    {visibleItems}/{manhwaList.length}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      )}
      
      {/* End of list message */}
      {showLoadMore && !shouldShowLoadMore && manhwaList.length > 0 && (
        <div className="text-center mt-8 text-gray-500 text-sm">
          You've reached the end of the list
        </div>
      )}
      
      {/* Modal */}
      {selectedManhwa && (
        <ManhwaModal 
          manhwa={selectedManhwa} 
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default ManhwaGrid;