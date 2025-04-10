import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from "../context/ShopContext"
import assets from '../assets/assets';
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"

const Shop = () => {
  const { productList, search, showSearch } = useContext(ShopContext);  
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [categories, setCategories] = useState([]);

  const toggleCategory = (category) => {
    setCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const applyFiltersAndSort = () => {
    let result = [...productList];

    // Apply search filter
    if (showSearch && search) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (categories.length > 0) {
      result = result.filter(product => 
        categories.includes(product.category)
      );
    }

    // Apply sorting
    switch(sortType) {
      case "low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        // Default sorting (relevant/newest)
        break;
    }

    setFilteredProducts(result);
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [categories, search, showSearch, productList, sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filters Sidebar */}
      <div className="min-w-60">
        <div 
          onClick={() => setShowFilter(!showFilter)} 
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS 
          <img 
            src={assets.dropdown_icon} 
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} 
            alt="dropdown" 
          />
        </div>
        
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map(category => (
              <label key={category} className="flex gap-2 items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className='w-3 h-3'
                  checked={categories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                {category}
              </label>
            ))}
          </div>
          {categories.length > 0 && (
            <button 
              onClick={() => setCategories([])}
              className="text-xs text-blue-500 mt-3 hover:underline"
            >
              Clear categories
            </button>
          )}
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          
          {/* Sort Dropdown */}
          <select 
            value={sortType}
            onChange={(e) => setSortType(e.target.value)} 
            className='border border-gray-300 text-sm px-2 cursor-pointer'
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filteredProducts.map((item, index) => (
              <ProductItem 
                key={index}
                id={item._id}
                name={item.name}
                image={item.image[0]}
                price={item.price}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p>No products found matching your filters</p>
            <button
              onClick={() => {
                setCategories([]);
                setSortType("relevant");
              }}
              className="text-blue-500 hover:underline mt-2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Shop