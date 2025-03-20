import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/footer';
import Item from '../components/merch_item';
import '../CSS/Store.css';
import { Slider } from '../components/ui/slider';
import { FaFilter } from 'react-icons/fa';
import { FaFilterCircleXmark } from 'react-icons/fa6';
import { UserContext } from '../App';
import { get, getDatabase, ref } from 'firebase/database';
import Fuse from 'fuse.js';
import { motion, AnimatePresence } from 'framer-motion';

const Store = () => {
  type Item = {
    imageUrl: string;
    price: number;
    title: string;
    description: string;
    category:
      | 'Vinyl'
      | 'Hoodies'
      | 'T-Shirts'
      | 'Tank Top'
      | 'Stickers'
      | 'Candle'
      | 'Phone Case'
      | 'Hat'
      | 'Bag'
      | 'Socks';
    orange?: string[];
    blue?: string[];
    black?: string[];
    grey?: string[];
  };

  const { user } = useContext(UserContext);

  const [showFilters, setShowFilters] = useState(false);
  const [storeItems, setStoreItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const database = getDatabase();
    const cartRef = ref(database, '/Merch/');
    get(cartRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const items: Item[] = Object.values(data);
          setStoreItems(items);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  const [filters, setFilters] = useState({
    category: 'All',
    minPrice: 4.99,
    maxPrice: 50.0,
  });

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, category: event.target.value }));
  };

  const filteredItems = storeItems.filter((item) => {
    return (
      (filters.category === 'All' || item.category === filters.category) &&
      item.price >= filters.minPrice &&
      item.price <= filters.maxPrice
    );
  });

  const fuse = new Fuse(storeItems, {
    keys: ['title', 'description'],
    threshold: 0.3,
  });

  const searchResults = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : filteredItems;

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#000000',
          paddingTop: '0px',
          width: '100%',
          paddingBottom: '50px',
          marginTop: '-51px',
        }}
      >
        <div className="hero-store">
          <div className="hero-store-overlay">
            <h1 className='hero-store-title'style={{fontFamily: 'Sansation',color: 'white',fontWeight: '700',}}>Shop Stage Fright</h1>
            <div className="shop-search-container">
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="shop-search"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            backgroundColor: '#333',
            color: 'white',
            fontSize: '18px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
            alignSelf: 'center',
            width: 'auto',
            transform: showFilters ? 'translateY(-10px)' : 'translateY(0)',
            transition: 'transform 0.3s ease',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ marginRight: '10px' }}>
            {showFilters ? <FaFilterCircleXmark /> : <FaFilter />}
          </span>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '5px',
            marginTop: '15px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden',
            height: showFilters ? '135px' : '0px',
            opacity: showFilters ? '1' : '0',
            transition: 'height 0.5s ease, opacity 0.3s ease',
            width: showFilters ? '82%' : '0%',
            backgroundColor: showFilters ? '#1a1a1a' : 'black',
          }}
        >
          {showFilters && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '20px',
                backgroundColor: '#121212',
                borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div style={{ flex: 1, marginRight: '20px' }}>
                <label
                  style={{
                    fontSize: '18px',
                    color: '#EAEAEA',
                    marginBottom: '8px',
                    display: 'block',
                    fontWeight: '500',
                  }}
                >
                  Category
                </label>
                <select
                  onChange={handleCategoryChange}
                  style={{
                    padding: '10px 15px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    border: '1px solid #444',
                    backgroundColor: '#333',
                    color: 'white',
                    width: '100%',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <option value="All">All</option>
                  <option value="Vinyl">Albums</option>
                  <option value="Hoodies">Hoodies</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Stickers">Stickers</option>
                  <option value="Tank Top">Tank Top</option>
                  <option value="Candle">Candle</option>
                  <option value="Phone Case">Phone Case</option>
                  <option value="Hat">Hat</option>
                  <option value="Bag">Bag</option>
                  <option value="Socks">Socks</option>
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontSize: '18px',
                    color: '#EAEAEA',
                    marginBottom: '8px',
                    display: 'block',
                    fontWeight: '500',
                  }}
                >
                  Price Range
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Slider
                    width="100%"
                    defaultValue={[0, 100]}
                    onValueChange={(values) => {
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: values.value[0],
                        maxPrice: values.value[1],
                      }));
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginTop: '10px',
                      fontSize: '14px',
                      color: '#EAEAEA',
                    }}
                  >
                    <span>Min: ${filters.minPrice.toFixed(2)}</span>
                    <span>Max: ${filters.maxPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <motion.div
          layout
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            width: '100%',
            marginTop: '20px',
          }}
        >
          <AnimatePresence>
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <Item
                    imageUrl={item.imageUrl}
                    price={item.price}
                    title={item.title}
                    description={item.description}
                    orange={item.orange}
                    blue={item.blue}
                    black={item.black}
                    grey={item.grey}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginTop: '20vh',
                  marginBottom: '20vh',
                }}
              >
                No results found
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Store;