import React from 'react';

const ManhwaCard = ({ title, cover, rating, chapters, genres, onClick }) => {
  return (
    <div 
      className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-blue-900/10 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4]">
        <img 
          src={cover} 
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
          <div className="flex items-center">
            <div className="flex items-center bg-black/60 px-2 py-1 rounded-full">
              <svg className="w-3.5 h-3.5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="text-white text-xs font-medium">{rating}</span>
            </div>
            <div className="ml-2 bg-blue-900/70 px-2 py-1 rounded-full text-xs text-blue-200 font-medium">
              {chapters} Ch
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-200 text-sm line-clamp-1">{title}</h3>
        {genres && genres.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {genres.slice(0, 2).map((genre, index) => (
              <span key={index} className="px-1.5 py-0.5 bg-gray-800 rounded text-xs text-gray-400">
                {genre}
              </span>
            ))}
            {genres.length > 2 && (
              <span className="px-1.5 py-0.5 bg-gray-800 rounded text-xs text-gray-400">
                +{genres.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManhwaCard;