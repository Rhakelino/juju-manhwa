import { useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroCarousel from "./components/HeroCarousel";
import ManhwaGrid from "./components/ManhwaGrid";

// Cache duration in milliseconds (1 hour)
const CACHE_DURATION = 60 * 60 * 1000;

export default function HomePage() {
  const [manhwaList, setManhwaList] = useState([]);
  const [topManhwa, setTopManhwa] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("trending");
  const [isFetchingFresh, setIsFetchingFresh] = useState(false);

  // Search-related state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Top manhwa pagination state
  const [topManhwaPage, setTopManhwaPage] = useState(1);
  const [hasMoreTopManhwa, setHasMoreTopManhwa] = useState(true);

  // Function to fetch top manhwa from Jikan API
  const fetchTopManhwa = useCallback(async (page = 1, append = false) => {
    try {
      // Check cache if this is the first page request and not appending
      if (page === 1 && !append) {
        const cachedData = localStorage.getItem('topManhwaCache');
        const cachedTimestamp = localStorage.getItem('topManhwaCacheTimestamp');
        const currentTime = new Date().getTime();

        const isCacheValid =
          cachedData &&
          cachedTimestamp &&
          (currentTime - parseInt(cachedTimestamp) < CACHE_DURATION);

        if (isCacheValid) {
          const parsedData = JSON.parse(cachedData);
          setTopManhwa(parsedData);

          if (!append) {
            setIsLoading(false);
          }

          console.log('Using cached top manhwa data');
          return;
        }
      }

      if (page === 1) {
        !append && setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      // Jikan API endpoint for top manga
      const response = await fetch(
        `https://api.jikan.moe/v4/top/manga?page=${page}&limit=10&filter=bypopularity`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Format the data for our needs
      const formattedData = data.data.map(item => {
        return {
          id: item.mal_id,
          title: item.title || "Unknown Title",
          description: item.synopsis || "No description available",
          coverImage: item.images.jpg.large_image_url || item.images.jpg.image_url,
          status: item.status === "Finished" ? "completed" : "ongoing",
          rating: (item.score || (Math.random() * 2 + 3)).toFixed(1),
          chapters: item.chapters || Math.floor(Math.random() * 100) + 1,
          updatedAt: item.published.from,
          authors: item.authors?.map(author => author.name).join(", "),
          genres: item.genres?.map(genre => genre.name)
        };
      });

      // Update state depending on whether we're appending or replacing
      if (append) {
        setTopManhwa(prev => [...prev, ...formattedData]);
      } else {
        setTopManhwa(formattedData);

        // Cache only the first page
        localStorage.setItem('topManhwaCache', JSON.stringify(formattedData));
        localStorage.setItem('topManhwaCacheTimestamp', new Date().getTime().toString());
      }

      // Check if we have more pages
      setHasMoreTopManhwa(data.pagination.has_next_page);

      // Update page counter if we're appending
      if (append) {
        setTopManhwaPage(page);
      }
    } catch (error) {
      console.error("Error fetching top manhwa:", error);
      setError(error.message);

      // Try to fall back to cache if available
      if (page === 1 && !append) {
        const cachedData = localStorage.getItem('topManhwaCache');
        if (cachedData) {
          try {
            setTopManhwa(JSON.parse(cachedData));
            console.log('Falling back to cached data due to error');
          } catch (e) {
            console.error('Error parsing cached data:', e);
          }
        }
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  // Function to fetch manhwa by title - this was referenced but missing
  const fetchManhwaByTitle = useCallback(async (title) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(title)}&limit=1`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.data[0] || null;
    } catch (error) {
      console.error(`Error fetching manhwa ${title}:`, error);
      return null;
    }
  }, []);

  // Format API data
  const formatManhwaData = useCallback((apiData) => {
    if (!apiData) return null;

    return {
      id: apiData.mal_id,
      title: apiData.title || "Unknown Title",
      description: apiData.synopsis || "No description available",
      coverImage: apiData.images.jpg.large_image_url || apiData.images.jpg.image_url,
      status: apiData.status === "Finished" ? "completed" : "ongoing",
      rating: (apiData.score || (Math.random() * 2 + 3)).toFixed(1),
      chapters: apiData.chapters || Math.floor(Math.random() * 100) + 1,
      updatedAt: apiData.published.from,
      authors: apiData.authors?.map(author => author.name).join(", "),
      genres: apiData.genres?.map(genre => genre.name)
    };
  }, []);

  // Main fetch function that was missing
  const fetchAllManhwa = useCallback(async (forceFresh = false) => {
    try {
      // Check cache first
      const cachedData = localStorage.getItem('manhwaCache');
      const cachedTimestamp = localStorage.getItem('manhwaCacheTimestamp');
      const currentTime = new Date().getTime();

      const isCacheValid =
        !forceFresh &&
        cachedData &&
        cachedTimestamp &&
        (currentTime - parseInt(cachedTimestamp) < CACHE_DURATION);

      if (isCacheValid) {
        setManhwaList(JSON.parse(cachedData));
        setIsLoading(false);
        console.log('Using cached manhwa data');
        return;
      }

      setIsLoading(true);
      if (forceFresh) {
        setIsFetchingFresh(true);
      }

      // Sample manga titles to fetch if you don't have a predefined list
      const popularTitles = [
        "Solo Leveling",
        "Tower of God",
        "The God of High School",
        "Noblesse",
        "The Breaker",
        "Sweet Home",
        "Bastard",
        "The Gamer",
        "Girl's of the Wild's",
        "Hardcore Leveling Warrior"
      ];

      // Fetch and format data for each title
      const manhwaPromises = popularTitles.map(async (title) => {
        const apiData = await fetchManhwaByTitle(title);
        return formatManhwaData(apiData);
      });

      const results = await Promise.all(manhwaPromises);
      const filteredResults = results.filter(item => item !== null);

      setManhwaList(filteredResults);

      // Cache the data
      localStorage.setItem('manhwaCache', JSON.stringify(filteredResults));
      localStorage.setItem('manhwaCacheTimestamp', currentTime.toString());

    } catch (error) {
      console.error("Error fetching all manhwa:", error);
      setError("Failed to load manhwa list: " + error.message);

      // Try to fall back to cache if available
      const cachedData = localStorage.getItem('manhwaCache');
      if (cachedData) {
        try {
          setManhwaList(JSON.parse(cachedData));
          console.log('Falling back to cached data due to error');
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }
    } finally {
      setIsLoading(false);
      setIsFetchingFresh(false);
    }
  }, [fetchManhwaByTitle, formatManhwaData]);

  // New function to handle search
  const handleSearch = useCallback(async (query) => {
    // If search query is empty, reset search state
    if (!query.trim()) {
      setSearchResults([]);
      setSearchQuery("");
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setSearchQuery(query);

    try {
      // Make API call for search
      const response = await fetch(
        `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query)}&limit=20`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Format the API search results
      const apiResults = data.data.map(item => {
        return {
          id: item.mal_id,
          title: item.title || "Unknown Title",
          description: item.synopsis || "No description available",
          coverImage: item.images.jpg.large_image_url || item.images.jpg.image_url,
          status: item.status === "Finished" ? "completed" : "ongoing",
          rating: (item.score || (Math.random() * 2 + 3)).toFixed(1),
          chapters: item.chapters || Math.floor(Math.random() * 100) + 1,
          updatedAt: item.published.from,
          authors: item.authors?.map(author => author.name).join(", "),
          genres: item.genres?.map(genre => genre.name)
        };
      });

      setSearchResults(apiResults);
    } catch (error) {
      console.error("Error searching manhwa:", error);
      setError(`Search error: ${error.message}`);

      // Fall back to local search if API fails
      const fallbackResults = [...topManhwa, ...manhwaList].filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.genres && item.genres.some(genre =>
          genre.toLowerCase().includes(query.toLowerCase())
        ))
      );

      setSearchResults(fallbackResults);
    } finally {
      setIsSearching(false);
    }
  }, [topManhwa, manhwaList]);

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  // Load data on component mount
  useEffect(() => {
    fetchAllManhwa();
    fetchTopManhwa(1, false);
  }, [fetchAllManhwa, fetchTopManhwa]);

  // Function to handle load more for top manhwa
  const handleLoadMoreTopManhwa = useCallback(() => {
    if (hasMoreTopManhwa && !isLoadingMore) {
      fetchTopManhwa(topManhwaPage + 1, true);
    }
  }, [fetchTopManhwa, hasMoreTopManhwa, isLoadingMore, topManhwaPage]);

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar onSearch={handleSearch} />
      <main className="container mx-auto px-4 py-6">
        {/* Loading and error states */}
        {isLoading && !searchQuery && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 my-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Search Results Section */}
        {searchQuery && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 flex-grow">
                <h1 className="text-2xl font-bold text-white relative">
                  Search Results: "{searchQuery}"
                  <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></span>
                </h1>
                <div className="flex-grow h-px bg-gray-800"></div>
              </div>
              <button
                onClick={clearSearch}
                className="text-sm text-gray-400 hover:text-white px-3 py-1 border border-gray-700 rounded-full hover:border-gray-600 transition-colors"
              >
                Clear Search
              </button>
            </div>

            {isSearching ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {searchResults.length > 0 ? (
                  <ManhwaGrid
                    manhwaList={searchResults}
                    showLoadMore={false}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 bg-gray-900/50 rounded-lg border border-gray-800">
                    <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <p className="text-gray-400">No results found for "{searchQuery}"</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Only show default content when not searching */}
        {!searchQuery && !isLoading && !error && (topManhwa.length > 0 || manhwaList.length > 0) && (
          <>
            {/* Hero Banner Carousel */}
            <HeroCarousel
              manhwaList={topManhwa.length > 0 ? topManhwa.slice(0, 5) : manhwaList.slice(0, 5)}
            />

            {/* Trending Section */}
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <h1 className="text-3xl font-bold text-white relative">
                  Trending
                  <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></span>
                </h1>
                <div className="flex-grow h-px bg-gray-800"></div>
              </div>
              <div className="mt-6 space-y-4">
                <ManhwaGrid
                  manhwaList={topManhwa}
                  showLoadMore={true}
                  onLoadMore={handleLoadMoreTopManhwa}
                  hasMore={hasMoreTopManhwa}
                  isLoading={isLoadingMore}
                />
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}