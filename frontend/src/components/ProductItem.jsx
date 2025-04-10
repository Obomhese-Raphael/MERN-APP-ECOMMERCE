import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from "react-router-dom"

const ProductItem = ({id, image, name, price}) => {
  const { currency } = useContext(ShopContext)
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior:'smooth'});
    }
  return (
    <Link to={`/product/${id}`} onClick={scrollToTop()} className='text-gray-700 cursor-pointer'>
        <div className="overflow-hidden">
            <img src={image} className='hover:scale-110 transition ease-in-out' alt="" />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">{currency}{price}</p>
    </Link>
  )
}

export default ProductItem;