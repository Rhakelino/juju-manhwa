// HomePage.jsx
import { useEffect, useState, useRef } from "react";

// List of popular manhwa titles to search for
const POPULAR_MANHWA = [
  "Solo Leveling",
  "Tower of God",
  "The God of High School",
  "Noblesse",
  "Sweet Home",
  "Bastard",
  "The Breaker",
  "The Gamer",
  "Hardcore Leveling Warrior",
  "Lookism",
  "Eleceed",
  "Omniscient Reader's Viewpoint",
  "True Beauty",
  "UnOrdinary",
  "Gosu",
  "Nano Machine",
  "Weak Hero",
  "The Beginning After the End"
];

export default function HomePage() {
  const [manhwaList, setManhwaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("trending");

  useEffect(() => {
    // Function to fetch a specific manhwa title
    const fetchManhwaByTitle = async (title) => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(title)}&limit=1`);
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          return data.data[0];
        }
        return null;
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
        return null;
      }
    };

    // Fetch multiple manhwa titles with delay to avoid rate limiting
    const fetchAllManhwa = async () => {
      setIsLoading(true);
      const results = [];
      
      for (let i = 0; i < POPULAR_MANHWA.length; i++) {
        const title = POPULAR_MANHWA[i];
        const result = await fetchManhwaByTitle(title);
        
        if (result) {
          results.push(result);
        }
        
        // Wait 1 second between requests to avoid rate limiting
        if (i < POPULAR_MANHWA.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // If we have 10 results already, we can stop to avoid too many requests
        if (results.length >= 10) break;
      }
      
      // Format the data for our needs
      const formattedData = results.map(item => {
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
      
      setManhwaList(formattedData);
      setIsLoading(false);
    };

    // Start the fetch process
    fetchAllManhwa();
  }, []);

  // Filter manhwa based on active tab
  const getTrendingManhwa = () => {
    // For demo purposes, we'll sort by rating
    return [...manhwaList].sort((a, b) => b.rating - a.rating);
  };

  const getLatestManhwa = () => {
    // Sort by updatedAt date
    return [...manhwaList].sort((a, b) => 
      new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  };

  const getNewManhwa = () => {
    // For demo, we'll just get different items
    return [...manhwaList].sort(() => Math.random() - 0.5);
  };

  // Get completed series
  const getCompletedManhwa = () => {
    const completed = manhwaList.filter(item => item.status === "completed");
    return completed.length > 0 ? completed : manhwaList.slice(0, 8);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* Modern Navigation Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/80 border-b border-gray-800">
        <div className="container mx-auto px-6 flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <svg className="w-8 h-8 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
            </svg>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">JujuManhwa</span>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Browse</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">New</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Popular</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Genres</a>
          </nav>
          
          {/* Search Bar */}
          <div className="relative w-full max-w-xs hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="search" 
              placeholder="Search manhwa..." 
              className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-800/60 border border-gray-700/50 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
            />
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-white md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
            <div className="h-6 border-r border-gray-700 mx-1 hidden md:block"></div>
            <a href="#" className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors">Sign In</a>
            <a href="#" className="ml-3 hidden md:block px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-900/20">Sign Up</a>
            <button className="p-2 text-gray-400 hover:text-white md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-400">Loading manhwa...</div>
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="text-xl text-red-400 mb-4">Error: {error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Retry
            </button>
          </div>
        ) : manhwaList.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-400">No manhwa found</div>
          </div>
        ) : (
          <>
            {/* Hero Banner Carousel - React version */}
            <HeroCarousel manhwaList={getTrendingManhwa().slice(0, 5)} />

            {/* Content Tabs */}
            <div className="mb-12">
              <div className="flex border-b border-gray-800">
                <button 
                  onClick={() => setActiveTab("trending")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "trending" 
                      ? "text-blue-400 border-b-2 border-blue-400" 
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  Trending
                </button>
                <button 
                  onClick={() => setActiveTab("latest")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "latest" 
                      ? "text-blue-400 border-b-2 border-blue-400" 
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  Latest Updates
                </button>
                <button 
                  onClick={() => setActiveTab("new")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "new" 
                      ? "text-blue-400 border-b-2 border-blue-400" 
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  New Releases
                </button>
              </div>
              
              <div className="mt-6 space-y-4">
                {activeTab === "trending" && (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {getTrendingManhwa().map((item) => (
                        <ManhwaCard 
                          key={item.id}
                          title={item.title}
                          cover={item.coverImage}
                          rating={item.rating}
                          chapters={item.chapters}
                          genres={item.genres}
                        />
                      ))}
                    </div>
                    <div className="flex justify-center mt-8">
                      <button className="px-6 py-2.5 bg-gray-800 border border-gray-700 text-gray-300 rounded-full hover:bg-gray-700 transition-all">
                        Load More
                      </button>
                    </div>
                  </>
                )}
                
                {activeTab === "latest" && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {getLatestManhwa().map((item) => (
                      <ManhwaCard 
                        key={item.id}
                        title={item.title}
                        cover={item.coverImage}
                        rating={item.rating}
                        chapters={item.chapters}
                        genres={item.genres}
                      />
                    ))}
                  </div>
                )}
                
                {activeTab === "new" && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {getNewManhwa().map((item) => (
                      <ManhwaCard 
                        key={item.id}
                        title={item.title}
                        cover={item.coverImage}
                        rating={item.rating}
                        chapters={item.chapters}
                        genres={item.genres}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Genres Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-white">Browse by Genre</h2>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(manhwaList.flatMap(item => item.genres || []))).slice(0, 12).map((genre) => (
                  <button 
                    key={genre} 
                    className="px-4 py-1.5 border border-gray-700 rounded-full text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Completed Series */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Completed Series</h2>
                <button className="text-blue-400 hover:text-blue-300 transition-colors font-medium">View All</button>
              </div>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-max">
                  {getCompletedManhwa().slice(0, 8).map((item) => (
                    <div key={item.id} className="w-[180px] shrink-0">
                      <ManhwaCard 
                        title={item.title}
                        cover={item.coverImage}
                        rating={item.rating}
                        chapters={item.chapters}
                        genres={item.genres}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Modern Footer */}
      <footer className="bg-gray-900 border-t border-gray-800/50 pt-12 pb-8">
        <div className="container mx-auto px-6">
          {/* Footer Top Section with Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo & About Column */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                </svg>
                <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">JujuManhwa</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Your ultimate destination for reading and discovering the best Korean comics and webtoons.</p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links Column */}
            <div className="col-span-1">
              <h3 className="text-gray-100 font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Browse All</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Latest Updates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Popular Series</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Completed</a></li>
              </ul>
            </div>
            
            {/* Genres Column */}
            <div className="col-span-1">
              <h3 className="text-gray-100 font-semibold mb-4 text-sm uppercase tracking-wider">Top Genres</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Action</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Fantasy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Romance</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Slice of Life</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Comedy</a></li>
              </ul>
            </div>
            
            {/* Newsletter Column */}
            <div className="col-span-1">
              <h3 className="text-gray-100 font-semibold mb-4 text-sm uppercase tracking-wider">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">Subscribe to get notified about new releases and updates.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 bg-gray-800 text-sm text-white rounded-l-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-r-md hover:from-blue-500 hover:to-indigo-500 transition-all">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-gray-800/50 my-6"></div>
          
          {/* Footer Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 JujuManhwa. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm justify-center">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// React carousel component (no Alpine.js)
function HeroCarousel({ manhwaList }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const intervalRef = useRef(null);

  // Handle auto-sliding
  useEffect(() => {
    // Start auto-slide
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % manhwaList.length);
    }, 5000);

    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [manhwaList.length]);

  // Pause auto-slide on hover
  const pauseAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Resume auto-slide on mouse leave
  const resumeAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % manhwaList.length);
    }, 5000);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % manhwaList.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + manhwaList.length) % manhwaList.length);
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <div 
      className="relative w-full h-[400px] mb-12 rounded-lg overflow-hidden border border-gray-800 group"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Slides Container */}
      <div className="h-full relative">
        {/* Map through slides */}
        {manhwaList.map((manhwa, index) => (
          <div 
            key={manhwa.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
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
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
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
            onClick={() => goToSlide(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === activeSlide ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-500 w-2.5'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

// Manhwa Card Component
function ManhwaCard({ title, cover, rating, chapters, genres }) {
  // Get first genre as a badge
  const primaryGenre = genres && genres.length > 0 ? genres[0] : null;

  return (
    <div className="bg-gray-900 overflow-hidden rounded-lg border border-gray-800 hover:shadow-lg hover:border-gray-700 transition-all group">
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