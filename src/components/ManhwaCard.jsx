// ManhwaCard.jsx
function ManhwaCard({ title, cover, rating, chapters, genres, onClick }) {
  // Get first genre as a badge
  const primaryGenre = genres && genres.length > 0 ? genres[0] : null;

  return (
    <div 
      className="bg-gray-900 overflow-hidden rounded-lg border border-gray-800 hover:shadow-lg hover:border-gray-700 transition-all group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/240x320?text=No+Image';
          }}
        />
        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded-full">
          ★ {rating}
        </div>
        {primaryGenre && (
          <div className="absolute bottom-2 left-2 bg-blue-600/90 text-white text-xs font-medium px-2 py-1 rounded-full">
            {primaryGenre}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm truncate text-white">{title}</h3>
        <p className="text-xs text-gray-400 mt-1">Ch. {chapters}</p>
      </div>
    </div>
  );
}

export default ManhwaCard;