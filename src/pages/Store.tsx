import React, { useState } from 'react';
import Footer from '../components/footer';
import Item from '../components/merch_item';
import '../CSS/Store.css'; 
import { Slider } from '../components/ui/slider';
import { FaFilter } from 'react-icons/fa';
import { FaFilterCircleXmark } from "react-icons/fa6";


const allItems = [
  { imageUrl: '/images/Merch/Vinyls/Soaring Vinyl.png', price: 37.99, title: 'Soaring Vinyl', description: 'Physical Vinyl of the album Soaring crafted by the Stage Fright team', category: 'Vinyl' },
  { imageUrl: '/images/Merch/Vinyls/Resounding Vinyl.png', price: 40.99, title: 'Resounding Vinyl', description: 'Physical Vinyl of the album Resounding crafted by the Stage Fright team', category: 'Vinyl' },
  { imageUrl: '/images/Merch/Vinyls/Kinematics Vinyl.png', price: 35.99, title: 'Kinematics Vinyl', description: 'Physical Vinyl of the album Kinematics crafted by the Stage Fright team', category: 'Vinyl' },
  {
    imageUrl: '/images/Merch/Hoodies/Black/Main.png',
    price: 29.99,
    title: 'Stage Fright Hoodie',
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

  {
    imageUrl: '/images/Merch/Shirts/Black/Main.png',
    price: 19.99,
    title: 'Stage Fright T-Shirt',
    description: 'Every stitch in this garment tells the story of a master craftsperson’s dedication to perfection.',
    category: 'T-Shirts',
    orange: [
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/Orange/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/Orange/Folded.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/Orange/Male.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/Orange/Female.png`,
    ],
    blue: [
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/Blue/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/Blue/Folded.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/Blue/Male.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/Blue/Female.png`,
    ],
    black: [
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/Black/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/Black/Folded.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/Black/Male.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/Black/Female.png`,
    ],
    grey: [
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/White/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/White/Folded.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/White/Male.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Shirts/White/Female.png`,
    ],
  },
  {
    imageUrl: '/images/Merch/TankTop/Black/Main.png',
    price: 19.99,
    title: 'Stage Fright Tank Top',
    description: 'Every stitch in this garment tells the story of a master craftsperson’s dedication to perfection.',
    category: 'Tank Top',
    orange: [
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Orange/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Orange/Female1.png`,
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Orange/Female2.png`,
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Orange/closeup.png`,
    ],
    blue: [
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Blue/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Blue/Female1.png`,
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Blue/Female2.png`,
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Blue/closeup.png`,
    ],
    black: [
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Black/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Black/Female1.png`,
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Black/Female2.png`,
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Black/closeup.png`,
    ],
    grey: [
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Grey/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Grey/Female1.png`,
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Grey/Female2.png`,
      `${import.meta.env.BASE_URL}/images/Merch/TankTop/Grey/closeup.png`,
    ],
  },
  { imageUrl: '/images/Merch/Stickers/sticker.png', price: 35.99, title: 'White Stage Fright Sticker', description: 'Show off Your Stage Fright Pride with a sticker that can be placed on any surface', category: 'Stickers' },
  { imageUrl: '/images/Merch/Candle/Candle.png', price: 5.99, title: 'Stage Fright Candle', description: 'This hand-poured candle fills your space with a soothing, long-lasting fragrance, creating a warm and inviting atmosphere.', category: 'Candle' },
  {
    imageUrl: '/images/Merch/PhoneCase/Black/Main.png',
    price: 29.99,
    title: 'iPhone 15 Phone Case',
    description: 'Protect your phone in style with this durable, sleek case that offers a perfect fit and a modern design.',
    category: 'Phone Case',
    orange: [
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/Orange/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/Orange/Dual.png`,
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/Orange/Table.png`,
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/Orange/Outline.png`,
    ],
    blue: [
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/Blue/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/Blue/Dual.png`,
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/Blue/Table.png`,
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/Blue/Outline.png`,
    ],
    black: [
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/Black/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/Black/Dual.png`,
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/Black/Table.png`,
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/Black/Outline.png`,
    ],
    grey: [
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/White/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/White/Dual.png`,
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/White/Table.png`,
      `${import.meta.env.BASE_URL}/images/Merch/PhoneCase/White/Outline.png`,
    ],
  },
  {
    imageUrl: '/images/Merch/Hat/Black/Main.png',
    price: 9.99,
    title: 'Stage Fright Hat',
    description: 'Elevate your look with this comfortable and stylish hat, designed to keep you cool and fashionable all day long.',
    category: 'Hat',
    orange: [
      `${import.meta.env.BASE_URL}/images/Merch/Hat/Orange/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hat/Orange/Back.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hat/Orange/Male.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hat/Orange/Female.png`,
    ],
    blue: [
      `${import.meta.env.BASE_URL}/images/Merch/Hat/Blue/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hat/Blue/Back.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hat/Blue/Male.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hat/Blue/Female.png`,
    ],
    black: [
      `${import.meta.env.BASE_URL}/images/Merch/Hat/Black/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hat/Black/Back.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hat/Black/Male.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hat/Black/Female.png`,
    ],
    grey: [
      `${import.meta.env.BASE_URL}/images/Merch/Hat/White/Main.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hat/White/Back.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hat/White/Male.png`,
      `${import.meta.env.BASE_URL}/images/Merch/Hat/White/Female.png`,
    ],
  },
  { imageUrl: '/images/Merch/Bag/Bag.png', price: 24.99, title: 'Stage Fright Tote Bag', description: 'Carry your essentials in style with this durable and spacious tote bag, perfect for any occasion.', category: 'Bag' },
  { imageUrl: '/images/Merch/Socks/Socks.png', price: 8.99, title: 'Stage Fright Socks', description: 'Step into comfort with these soft, breathable socks that provide all-day support and warmth.', category: 'Socks' },
];

const Store = () => {
  const [filters, setFilters] = useState({
    category: 'All',
    minPrice: 4.99,
    maxPrice: 100,
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, category: event.target.value }));
    
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#000000', paddingTop: '0px', width: '100%', paddingBottom: '50px', marginTop: '-51px' }}>

      <div style={{marginTop: '7%'}} className='hero-store'>
        <div className='hero-store-overlay'>
          <h1 style={{ fontFamily: 'Sansation', color: 'white', fontSize: '80px', fontWeight: '700',}}>Shop Stage Fright</h1>
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
            marginTop: '40px',
            marginLeft: '168px',
            alignSelf: 'flex-start',
            width: 'auto',
            transform: showFilters ? 'translateY(-40px)' : 'translateY(0)',
            transition: 'transform 0.3s ease',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ marginRight: '10px' }}>
          {showFilters ? <FaFilterCircleXmark />:<FaFilter />  }
            
          </span>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filter Section */}
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
            {/* Category Filter */}
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

            {/* Price Range Slider */}
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