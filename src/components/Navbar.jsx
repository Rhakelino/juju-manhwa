import React, { useState } from 'react'

const Navbar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileSearchVisible, setMobileSearchVisible] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch && searchQuery.trim()) {
            onSearch(searchQuery);
        }
    }

    const toggleMobileSearch = () => {
        setMobileSearchVisible(!mobileSearchVisible);
    }

    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/80 border-b border-gray-800">
            <div className="container mx-auto px-6 flex h-16 items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center">
                    <svg className="w-8 h-8 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                    </svg>
                    <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">JujuChapter </span>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center space-x-6">
                    <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Browse</a>
                    <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">New</a>
                    <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Popular</a>
                    <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Genres</a>
                </nav>

                {/* Desktop Search Bar */}
                <div className="relative w-full max-w-xs hidden md:block">
                    <form onSubmit={handleSearch}>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            type="search"
                            placeholder="Search manhwa..."
                            className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-800/60 border border-gray-700/50 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>

                {/* User Actions */}
                <div className="flex items-center space-x-2">
                    <button 
                        className="p-2 text-gray-400 hover:text-white md:hidden" 
                        onClick={toggleMobileSearch}
                    >
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
            
            {/* Mobile Search Bar - appears when toggled */}
            {mobileSearchVisible && (
                <div className="md:hidden px-4 py-3 border-t border-gray-800 bg-black/90">
                    <form onSubmit={handleSearch} className="flex">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input
                                type="search"
                                placeholder="Search manhwa..."
                                className="w-full py-2 pl-10 pr-4 rounded-l-full bg-gray-800/60 border border-gray-700/50 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-blue-600 rounded-r-full text-white text-sm font-medium hover:bg-blue-500 transition-colors"
                        >
                            Search
                        </button>
                    </form>
                </div>
            )}
        </header>
    )
}

export default Navbar