import React, { useState } from 'react';
import Footer from '../components/footer';
import Item from '../components/merch_item';

const allItems = [
  { imageUrl: '/images/Merch/Vinyls/Soaring Vinyl.png', price: 37.99, title: 'Soaring Vinyl', description: 'Physical Vinyl of the album Soaring crafted by the Stage Fright team', category: 'Vinyl' },
  { imageUrl: '/images/Merch/Vinyls/Resounding Vinyl.png', price: 40.99, title: 'Resounding Vinyl', description: 'Physical Vinyl of the album Resounding crafted by the Stage Fright team', category: 'Vinyl' },
  { imageUrl: '/images/Merch/Vinyls/Kinematics Vinyl.png', price: 35.99, title: 'Kinematics Vinyl', description: 'Physical Vinyl of the album Kinematics crafted by the Stage Fright team', category: 'Vinyl' },
  {
    imageUrl: '/images/Merch/Hoodies/Black/Main.png',
    price: 29.99,
    title: 'Black Stage Fright Hoodie',
    description: 'Every stitch in this garment tells the story of a master craftsperson’s dedication to perfection.',
    category: 'Hoodies',
    orange: [
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Orange/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Orange/Back.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Orange/Male.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Orange/Female.png`,
    ],
    blue: [
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Blue/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Blue/Back.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Blue/Male.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Blue/Female.png`,
    ],
    black: [
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Black/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Black/Back.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Black/Male.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Black/Female.png`,
    ],
    grey: [
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Gray/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Gray/Back.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Gray/Male.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hoodies/Gray/Female.png`,
    ],
  },
];

const Store = () => {
  const [filters, setFilters] = useState({
    category: 'All',
    minPrice: 10,
    maxPrice: 100,
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, category: event.target.value }));
    
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice = parseFloat(event.target.value);
    if (minPrice < filters.maxPrice) {
      setFilters((prev) => ({ ...prev, minPrice }));
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = parseFloat(event.target.value);
    if (maxPrice > filters.minPrice) {
      setFilters((prev) => ({ ...prev, maxPrice }));
    }
  };

  const filteredItems = allItems.filter((item) => {
    return (
      (filters.category === 'All' || item.category === filters.category) &&
      item.price >= filters.minPrice &&
      item.price <= filters.maxPrice
    );
  });

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#000000', paddingTop: '100px', width: '100%', paddingBottom: '50px' }}>
        <h1 style={{ fontFamily: 'Sansation', color: 'white', fontSize: '50px', fontWeight: '700' }}>Shop Stage Fright</h1>

        {/* Filter Button */}
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
            marginTop: '40px',
            alignSelf: 'center',
            width: 'auto',
            transform: showFilters ? 'translateY(-40px)' : 'translateY(0)',
            transition: 'transform 0.3s ease',
          }}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filter Section */}
        <div
         style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '15px',
          marginTop: '15px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          height: showFilters ? '250px' : '0px', 
          opacity: showFilters ? '1' : '0',
          transition: 'height 0.5s ease, opacity 0.3s ease',
          width: showFilters ? '82%' : '0%',
          backgroundColor: showFilters ? '#1a1a1a' : 'black',
        }}
        >
          {showFilters && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {/* Category Filter */}
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '16px', color: 'white', marginRight: '10px' }}>Category</label>
                <select
                  onChange={handleCategoryChange}
                  style={{
                    padding: '8px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #444',
                    backgroundColor: '#222',
                    color: 'white',
                  }}
                >
                  <option value="All">All</option>
                  <option value="Vinyl">Albums</option>
                  <option value="Beanies">Beanies</option>
                  <option value="Hoodies">Hoodies</option>
                  <option value="T-Shirts">T-Shirts</option>
                </select>
              </div>

              {/* Price Range Slider */}
              <div style={{ width: '100%', marginBottom: '15px' }}>
                <label style={{ fontSize: '16px', color: 'white', marginRight: '10px' }}>Price Range</label>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={filters.minPrice}
                    onChange={handleMinPriceChange}
                    style={{
                      flex: 1,
                      background: '#555',
                      borderRadius: '5px',
                    }}
                  />
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={filters.maxPrice}
                    onChange={handleMaxPriceChange}
                    style={{
                      flex: 1,
                      background: '#555',
                      borderRadius: '5px',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'white' }}>Min: ${filters.minPrice.toFixed(2)}</span>
                  <span style={{ color: 'white' }}>Max: ${filters.maxPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Items Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
          {filteredItems.map((item, index) => (
            <Item
              key={index}
              imageUrl={`${import.meta.env.BASE_URL}${item.imageUrl}`}
              price={item.price}
              title={item.title}
              description={item.description}
              orange={item.orange}
              blue={item.blue}
              black={item.black}
              grey={item.grey}
            />
          ))}
        </div>

      </div>
      
      <Footer />
    </>
  );
};

export default Store;