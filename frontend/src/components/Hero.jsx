import React from 'react'
import assets from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden'>
      {/* Hero Left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="text-[#414141] space-y-2 sm:space-y-4">
            <div className="flex items-center gap-2">
                <p className='w-8 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-xs sm:text-sm'>OUR BESTSELLERS</p>
            </div>
            <h1 className='prata-regular text-2xl sm:text-3xl md:text-4xl leading-tight'>Latest Arrivals</h1>
            <div className="flex items-center gap-2">
                <p className="font-semibold text-xs sm:text-sm">SHOP NOW</p>
                <p className="w-8 h-[2px] bg-[#414141]"></p>
            </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 h-full">
        <img 
          src={assets.hero_img} 
          className='w-full h-full object-cover object-center' 
          alt="Latest shoe arrivals" 
        />
      </div>
    </div>
  )
}

export default Hero