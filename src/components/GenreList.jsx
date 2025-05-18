// GenreList.jsx
function GenreList({ genres = [], maxDisplay = 12 }) {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.slice(0, maxDisplay).map((genre) => (
        <button
          key={genre}
          className="px-4 py-1.5 border border-gray-700 rounded-full text-gray-300 hover:bg-gray-800 transition-colors"
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default GenreList;