import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiCalendar, FiTag, FiArrowRight, FiClock, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Blog1 from '../../assets/Blog.jpg';
import Blog2 from '../../assets/Blogg.jpg';
import Blog3 from '../../assets/Bloggg.jpg';
import Blog4 from '../../assets/Blogggg.jpg';

const BlogArchive = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  // Blog data with all cards including the "Meet Musoni" card
  const blogs = [
    {
      id: 1,
      title: {
        en: "Meet Musoni: Rwanda's Rabbit Farming Expert",
        fr: "Rencontrez Musoni: Expert en élevage de lapins du Rwanda",
        rw: "Menya Musoni: Umwarimu w'ubworozi bw'inkwavu muri Rwanda"
      },
      excerpt: {
        en: "Discover how Dieudonné Musoni is revolutionizing rabbit farming in Rwanda with innovative techniques",
        fr: "Découvrez comment Dieudonné Musoni révolutionne l'élevage de lapins au Rwanda avec des techniques innovantes",
        rw: "Menya uko Dieudonné Musoni yahindura ubworozi bw'inkwavu muri Rwanda dukoresheje uburyo bushya"
      },
      content: {
        en: [
          "Dieudonné Musoni, affectionately known as 'Bakame the Rabbit Expert', has become a pioneer in Rwanda's agricultural sector.",
          "His Kigali Rabbit Center has introduced artificial insemination technology for rabbits, a first in Rwanda's rabbit farming sector.",
          "This innovation boosts productivity, meat quality, and market supply - both locally and for export."
        ],
        fr: [
          "Dieudonné Musoni, affectueusement surnommé 'Bakame l'expert en lapins', est devenu un pionnier du secteur agricole rwandais.",
          "Son Kigali Rabbit Center a introduit la technologie d'insémination artificielle pour les lapins, une première dans le secteur de l'élevage de lapins au Rwanda.",
          "Cette innovation augmente la productivité, la qualité de la viande et l'approvisionnement du marché, tant localement qu'à l'exportation."
        ],
        rw: [
          "Dieudonné Musoni, uzwi nka 'Bakame Umwarimu w'inkwavu', yaje kuba umwungiranyi mu buhinzi bw'u Rwanda.",
          "Ikigo cye cya Kigali Rabbit Center cyatangije ikoranabuhanga ry'uburyo bwo gutera inkwavu mu buryo bw'ubumenyi, ari rya mbere mu Rwanda.",
          "Iki kintu cyongera umusaruro, ubwiza bw'inyama, no gutanga ibicuruzwa mu isoko - mu gihugu no mu mahanga."
        ]
      },
      date: "2023-06-10",
      readTime: "6",
      category: "farming",
      tags: ["innovation", "expert"],
      image: Blog4,
      featured: true
    },
    {
      id: 2,
      title: {
        en: "Giant Rabbits: 10kg Breeds in Rwanda",
        fr: "Lapins géants: Races de 10kg au Rwanda",
        rw: "Inkwavu Nini: Ubwoko bufata kilo 10 muri Rwanda"
      },
      excerpt: {
        en: "How Rwandan farmers are raising rabbits that weigh up to 10kg",
        fr: "Comment les agriculteurs rwandais élèvent des lapins pesant jusqu'à 10 kg",
        rw: "Uko abahinzi b'u Rwanda barerera inkwavu zifata kilo 10"
      },
      content: {
        en: [
          "Rwandan farmers are achieving remarkable success with giant rabbit breeds that can weigh up to 10kg.",
          "These breeds, introduced by the Kigali Rabbit Center, offer higher meat yield and better economic returns.",
          "Proper feeding and housing techniques are key to maintaining these large breeds successfully."
        ],
        fr: [
          "Les agriculteurs rwandais obtiennent un succès remarquable avec des races de lapins géants pouvant peser jusqu'à 10 kg.",
          "Ces races, introduites par le Kigali Rabbit Center, offrent un rendement en viande plus élevé et de meilleurs rendements économiques.",
          "Des techniques d'alimentation et de logement appropriées sont essentielles pour élever ces grandes races avec succès."
        ],
        rw: [
          "Abahinzi b'u Rwanda bakora neza cyane mu kwororoka ubwoko bw'inkwavu nini zishobora gufata kilo 10.",
          "Ubu bwoko, bwatanzwe na Kigali Rabbit Center, buha umusaruro mwinshi w'inyama n'inyungu nyinshi.",
          "Uburyo bwo gutanga ibiryo neza no kubaka amazu meza ni byo bifatwa nk'ingenzi mu kurera ubu bwoko."
        ]
      },
      date: "2023-05-15",
      readTime: "5",
      category: "farming",
      tags: ["breeds", "livestock"],
      image: Blog3,
      featured: true
    },
    {
      id: 3,
      title: {
        en: "Sustainable Rabbit Farming Practices",
        fr: "Pratiques durables d'élevage de lapins",
        rw: "Uburyo Bw'ubworozi bw'inkwavu Budakomeretsa"
      },
      excerpt: {
        en: "Eco-friendly methods for productive rabbit farming",
        fr: "Méthodes écologiques pour un élevage de lapins productif",
        rw: "Uburyo budakomeretsa ibidukikije mu kwororoka inkwavu"
      },
      content: {
        en: [
          "Sustainable rabbit farming focuses on methods that are environmentally friendly and economically viable.",
          "Key practices include proper waste management, using local feed resources, and maintaining animal welfare standards.",
          "These methods not only protect the environment but also improve the quality of rabbit products."
        ],
        fr: [
          "L'élevage durable de lapins se concentre sur des méthodes respectueuses de l'environnement et économiquement viables.",
          "Les pratiques clés incluent une bonne gestion des déchets, l'utilisation de ressources alimentaires locales et le maintien de normes de bien-être animal.",
          "Ces méthodes protègent non seulement l'environnement mais améliorent également la qualité des produits à base de lapin."
        ],
        rw: [
          "Ubworozi bw'inkwavu budakomeretsa ibidukikije bushishikariza uburyo budakomeretsa kandi bufite akamaro mu bukungu.",
          "Uburyo nyamukuru harimo gukoresha neza imyanda, gukoresha ibiryo byo mu karere, no kurinda ubuzima bw'inyamaswa.",
          "Uburyo bwo komeza kubaho ntibyongera gusa ibidukikije ahubwo bukagira n'inkwavu mwiza."
        ]
      },
      date: "2023-04-20",
      readTime: "7",
      category: "sustainability",
      tags: ["eco-friendly", "practices"],
      image: Blog2,
      featured: false
    },
    {
      id: 4,
      title: {
        en: "Building the Perfect Rabbit Hutch",
        fr: "Construire le clapier parfait",
        rw: "Kubaka Akazi K'inkwavu Gekwiye"
      },
      excerpt: {
        en: "Step-by-step guide to creating comfortable living spaces for your rabbits",
        fr: "Guide étape par étape pour créer des espaces de vie confortables pour vos lapins",
        rw: "Uburyo bwo kubaka ahantu heza ho kubamo inkwavu zawe"
      },
      content: {
        en: [
          "A well-designed rabbit hutch is essential for successful rabbit farming.",
          "Key features include proper ventilation, protection from predators, and easy cleaning access.",
          "This guide walks you through building a hutch that meets all your rabbits' needs."
        ],
        fr: [
          "Un clapier bien conçu est essentiel pour un élevage de lapins réussi.",
          "Les caractéristiques clés incluent une ventilation appropriée, une protection contre les prédateurs et un accès facile pour le nettoyage.",
          "Ce guide vous explique comment construire un clapier qui répond à tous les besoins de vos lapins."
        ],
        rw: [
          "Akazi k'inkwavu gakozwe neza ni ingenzi mu kwororoka inkwavu.",
          "Ibintu ngombwa harimo umuyaga uhagaze neza, kurinda inyamanswa, no kugira uburyo bworoshye bwo gusukura.",
          "Iri gamba riragufasha mu kubaka akazi kuzana ibyo inkwavu zawe zose zikeneye."
        ]
      },
      date: "2023-03-12",
      readTime: "8",
      category: "housing",
      tags: ["construction", "design"],
      image: Blog1,
      featured: false
    }
  ];

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState(null);
  const [activeBlog, setActiveBlog] = useState(null);

  // Process blogs for current language
  const processedBlogs = blogs.map(blog => ({
    ...blog,
    title: blog.title[language] || blog.title.en,
    excerpt: blog.excerpt[language] || blog.excerpt.en,
    content: blog.content[language] || blog.content.en
  }));

  // Get all unique tags
  const allTags = [...new Set(blogs.flatMap(blog => blog.tags))];

  // Get all categories
  const categories = ['all', ...new Set(blogs.map(blog => blog.category))];

  // Client-side search and filtering
  const filteredBlogs = processedBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Format date based on current language
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language, options);
  };

  // Get category name from translations
  const getCategoryName = (categoryKey) => {
    return t(`categories.${categoryKey}`) || categoryKey;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        {/* Featured Posts */}
        {processedBlogs.filter(b => b.featured).length > 0 && (
          <motion.div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {t('blog.featured_articles')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processedBlogs.filter(b => b.featured).map(blog => (
                <BlogCard 
                  key={blog.id}
                  blog={blog}
                  formatDate={formatDate}
                  getCategoryName={getCategoryName}
                  onReadMore={() => setActiveBlog(blog)}
                  t={t}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <SearchInput 
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={t('blog.search_placeholder')}
            />
            <CategorySelect 
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categories}
              allOption={t('blog.all_categories')}
              getCategoryName={getCategoryName}
            />
            <TagSelect 
              value={selectedTag}
              onChange={setSelectedTag}
              tags={allTags}
              allOption={t('blog.all_tags')}
            />
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('blog.latest_articles')}
          </h2>
          
          {filteredBlogs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-600 text-lg">
                {t('blog.no_articles_found')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredBlogs.map(blog => (
                  <BlogCard 
                    key={blog.id}
                    blog={blog}
                    formatDate={formatDate}
                    getCategoryName={getCategoryName}
                    onReadMore={() => setActiveBlog(blog)}
                    t={t}
                    compact
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Blog Detail Modal */}
        <BlogModal 
          blog={activeBlog}
          onClose={() => setActiveBlog(null)}
          formatDate={formatDate}
          getCategoryName={getCategoryName}
          t={t}
        />
      </div>
    </div>
  );
};

// Sub-components (same as before)
const BlogCard = ({ blog, formatDate, getCategoryName, onReadMore, t, compact = false }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
  >
    <div className={`${compact ? 'h-40' : 'h-48'} overflow-hidden`}>
      <img 
        src={blog.image} 
        alt={blog.title}
        className="w-full h-full object-cover hover:scale-105 transition-transform"
      />
    </div>
    <div className="p-6">
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <FiCalendar className="mr-1" />
        <span className="mr-4">{formatDate(blog.date)}</span>
        <FiClock className="mr-1" />
        <span>{blog.readTime} {t('blog.min_read')}</span>
      </div>
      <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-gray-800 mb-2`}>
        {blog.title}
      </h3>
      <p className={`text-gray-600 ${compact ? 'text-sm' : ''} mb-4`}>
        {blog.excerpt}
      </p>
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          {getCategoryName(blog.category)}
        </span>
        <button
          onClick={onReadMore}
          className="text-green-600 hover:text-green-800 font-medium flex items-center"
        >
          {compact ? t('blog.continue_reading') : t('blog.read_more')}
          <FiArrowRight className="ml-1" />
        </button>
      </div>
    </div>
  </motion.div>
);

const BlogModal = ({ blog, onClose, formatDate, getCategoryName, t }) => (
  <AnimatePresence>
    {blog && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="relative">
            <div className="h-64 md:h-80 overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              aria-label={t('blog.close')}
            >
              <FiX className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
              <span className="flex items-center mr-4">
                <FiCalendar className="mr-1" />
                {formatDate(blog.date)}
              </span>
              <span className="flex items-center mr-4">
                <FiClock className="mr-1" />
                {blog.readTime} {t('blog.min_read')}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                {getCategoryName(blog.category)}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {blog.title}
            </h2>
            <div className="prose max-w-none">
              {Array.isArray(blog.content) ? (
                blog.content.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-gray-700 mb-4">{blog.content}</p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Form components (same as before)
const SearchInput = ({ value, onChange, placeholder }) => (
  <div className="relative flex-1">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiSearch className="text-gray-400" />
    </div>
    <input
      type="text"
      placeholder={placeholder}
      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const CategorySelect = ({ value, onChange, options, allOption, getCategoryName }) => (
  <select
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="all">{allOption}</option>
    {options.filter(opt => opt !== 'all').map(option => (
      <option key={option} value={option}>
        {getCategoryName(option)}
      </option>
    ))}
  </select>
);

const TagSelect = ({ value, onChange, tags, allOption }) => (
  <select
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    value={value || ''}
    onChange={(e) => onChange(e.target.value || null)}
  >
    <option value="">{allOption}</option>
    {tags.map(tag => (
      <option key={tag} value={tag}>{tag}</option>
    ))}
  </select>
);

export default BlogArchive;