import React from 'react'

const Footer = () => {
    return (
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
                        © 2025 JujuChapter . All rights reserved.
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
    )
}

export default Footer
