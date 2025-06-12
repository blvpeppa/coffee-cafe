import React, { useState, useEffect } from 'react';
import { FiSearch, FiCalendar, FiTag, FiArrowRight, FiClock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Blog from '../../assets/Blog.jpg';
import Blogg from '../../assets/Blogg.jpg';
import Bloggg from '../../assets/Bloggg.jpg';
import Blogggg from '../../assets/Blogggg.jpg';
const BlogArchive = () => {
  // Sample blog data
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Gutera intanga inkwavu, rumwe rupima 10 Kgs 🐰🐇",
      excerpt: "It may sound surprising, but it’s real, and it’s happening right here in Rwanda! Meet Dieudonné Musoni, a visionary Rwandan entrepreneur and CEO of Kigali Rabbit Center, famously known as “Bakame the Rabbit Expert.”- Some of their rabbits breeds can weigh up to 10kg and beyond m, a testament to advanced breeding techniques and expert care.",
      date: "2023-05-15",
      readTime: "5 min read",
      category: "Farming",
      tags: ["Agriculture", "Livestock"],
      image: Blogggg,
      featured: true
    },
    {
      id: 2,
      title: "Sustainable Practices for Small Farms",
      excerpt: "Learn how to implement eco-friendly methods in your farming operations.",
      date: "2023-04-22",
      readTime: "8 min read",
      category: "Sustainability",
      tags: ["Eco-friendly", "Best Practices"],
      image: Blog,
      featured: false
    },
    {
      id: 3,
      title: "Gutera intanga inkwavu, rumwe rupima 10 Kgs 🐰🐇",
      excerpt: "He has officially introduced artificial insemination technology for rabbits, a first-of-its-kind breakthrough in Rwanda’s rabbit farming sector.- This innovation is set to revolutionize rabbit production, boosting productivity, meat quality, and market supply — not just locally, but for export too.",
      date: "2023-03-10",
      readTime: "6 min read",
      category: "Nutrition",
      tags: ["Feeding", "Health"],
      image: Blogg,
      featured: true
    },
    {
      id: 4,
      title: "Building the Perfect Rabbit Hutch",
      excerpt: "Step-by-step instructions for creating comfortable living spaces for your rabbits.",
      date: "2023-02-28",
      readTime: "10 min read",
      category: "Housing",
      tags: ["Construction", "Design"],
      image: Blog,
      featured: false
    },
    {
      id: 5,
      title: "Breeding Rabbits: A Seasonal Guide",
      excerpt: "Timing and techniques for successful rabbit breeding throughout the year.",
      date: "2023-01-15",
      readTime: "7 min read",
      category: "Breeding",
      tags: ["Reproduction", "Genetics"],
      image: Bloggg,
      featured: true
    },
    {
      id: 6,
      title: "Marketing Your Rabbit Products",
      excerpt: "Strategies for selling rabbit meat, fur, and other products profitably.",
      date: "2022-12-05",
      readTime: "9 min read",
      category: "Business",
      tags: ["Marketing", "Sales"],
      image: Blogg,
      featured: false
    }
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState(null);
  const [activeBlog, setActiveBlog] = useState(null);

  // Get unique categories and tags
  const categories = ['All', ...new Set(blogs.map(blog => blog.category))];
  const tags = [...new Set(blogs.flatMap(blog => blog.tags))];

  // Filter blogs based on search, category, and tag
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Featured blogs
  const featuredBlogs = blogs.filter(blog => blog.featured);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4"> Articles and Knowledge Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of articles, guides, and resources to enhance your rabbit farming journey.
          </p>
        </motion.div>

        {/* Featured Posts */}
        {featuredBlogs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBlogs.map(blog => (
                <motion.div
                  key={blog.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <FiCalendar className="mr-1" />
                      <span className="mr-4">{formatDate(blog.date)}</span>
                      <FiClock className="mr-1" />
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                    <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {blog.category}
                      </span>
                     <a href="https://x.com/mazimpakajp/status/1932764820048060620?s=46&t=OFIEid6xODjJg1yvknCS2w" target="_blank" rel="noopener noreferrer"> <button
                        onClick={() => setActiveBlog(blog)}
                        className="text-green-600 hover:text-green-800 font-medium flex items-center"
                      >
                        Read more <FiArrowRight className="ml-1" />
                      </button></a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex-1">
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Tag Filter */}
            <div className="flex-1">
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={selectedTag || ''}
                onChange={(e) => setSelectedTag(e.target.value || null)}
              >
                <option value="">All Tags</option>
                {tags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
            Latest Articles
          </h2>
          
          {filteredBlogs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredBlogs.map(blog => (
                  <motion.div
                    key={blog.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <FiCalendar className="mr-1" />
                        <span>{formatDate(blog.date)}</span>
                        <span className="mx-2">•</span>
                        <FiClock className="mr-1" />
                        <span>{blog.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{blog.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs cursor-pointer hover:bg-gray-200"
                            onClick={() => setSelectedTag(tag)}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={() => setActiveBlog(blog)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                      >
                        Continue reading <FiArrowRight className="ml-1" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Blog Detail Modal */}
        <AnimatePresence>
          {activeBlog && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setActiveBlog(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <div className="h-64 md:h-80 overflow-hidden">
                    <img 
                      src={activeBlog.image} 
                      alt={activeBlog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button 
                    onClick={() => setActiveBlog(null)}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <FiTimes className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center mr-4">
                      <FiCalendar className="mr-1" />
                      {formatDate(activeBlog.date)}
                    </span>
                    <span className="flex items-center mr-4">
                      <FiClock className="mr-1" />
                      {activeBlog.readTime}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                      {activeBlog.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{activeBlog.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeBlog.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs cursor-pointer hover:bg-gray-200"
                        onClick={() => {
                          setSelectedTag(tag);
                          setActiveBlog(null);
                        }}
                      >
                        <FiTag className="inline mr-1" /> {tag}
                      </span>
                    ))}
                  </div>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">
                      Rabbit farming has become an increasingly popular agricultural activity in Rwanda, 
                      offering both nutritional and economic benefits to farmers. This article explores 
                      the modern techniques that are revolutionizing rabbit husbandry in East Africa.
                    </p>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Introduction to Modern Rabbit Farming</h3>
                    <p className="text-gray-700 mb-4">
                      Traditional rabbit farming methods are being replaced with more efficient, 
                      sustainable practices that increase productivity while ensuring animal welfare. 
                      These methods include improved housing designs, better breeding techniques, 
                      and optimized feeding programs.
                    </p>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Key Benefits of Rabbit Farming</h3>
                    <ul className="list-disc pl-5 mb-4 text-gray-700">
                      <li className="mb-2">High reproductive rate and short generation interval</li>
                      <li className="mb-2">Low investment costs compared to other livestock</li>
                      <li className="mb-2">High-quality protein source for families</li>
                      <li className="mb-2">Manure production for organic farming</li>
                      <li>Potential for income generation through meat and fur sales</li>
                    </ul>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Getting Started</h3>
                    <p className="text-gray-700">
                      For those interested in starting rabbit farming, we recommend beginning with 
                      a small number of quality breeding stock, investing in proper housing, and 
                      educating yourself on rabbit nutrition and health management. Our training 
                      programs at Kigali Rabbit Farm can provide the necessary skills and knowledge 
                      to ensure your success in this venture.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlogArchive;