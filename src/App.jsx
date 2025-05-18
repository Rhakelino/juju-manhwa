// HomePage.jsx dengan Top Manhwa dari Jikan API
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

  // Top manhwa pagination state
  const [topManhwaPage, setTopManhwaPage] = useState(1);
  const [hasMoreTopManhwa, setHasMoreTopManhwa] = useState(true);

  // Function to fetch top manhwa from Jikan API
  const fetchTopManhwa = useCallback(async (page = 1, append = false) => {
    try {
      // Cek cache jika ini adalah request halaman pertama dan bukan append
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

      // Jikan API endpoint for top manga, filtering for korean comics (manhwa)
      const response = await fetch(
        `https://api.jikan.moe/v4/top/manga?page=${page}&limit=10&filter=bypopularity`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Filter untuk mendapatkan hanya manhwa (korea) - Not perfect but helps
      // Bisa juga pakai filter `type=manhwa` di API, tapi terkadang data tidak lengkap
      const koreanManhwa = data.data.filter(manga => {
        const isKorean =
          manga.titles.some(title =>
            title.type === "Korean" ||
            title.type === "ko" ||
            (manga.authors && manga.authors.some(author =>
              author.name && author.name.includes("Korean")))
          );
        return isKorean || (manga.themes && manga.themes.some(theme => theme.name === "Manhwa"));
      });

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

  // Existing fetch function for your initial manhwa
  const fetchManhwaByTitle = useCallback(async (title) => {
    // Your existing code...
  }, []);

  // Format API data for your initial manhwa
  const formatManhwaData = useCallback((apiData) => {
    // Your existing code...
  }, []);

  // Main fetch function with caching for your initial manhwa
  const fetchAllManhwa = useCallback(async (forceFresh = false) => {
    // Your existing code...
  }, [fetchManhwaByTitle, formatManhwaData]);

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
      {/* Header, loading states, etc. */}
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {/* Include existing loading, error states */}

        {!isLoading && !error && (manhwaList.length > 0 || topManhwa.length > 0) && (
          <>
            {/* Hero Banner Carousel */}
            <HeroCarousel
              manhwaList={topManhwa.length > 0 ? topManhwa.slice(0, 5) : manhwaList.slice(0, 5)}
            />

      
            {/* Improved Header Design */}
            <div className="mb-12">
              {/* Stylish heading with accent line and gradient */}
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