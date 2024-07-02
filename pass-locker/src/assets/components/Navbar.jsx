import React from 'react'
import Logo from './Logo'


const Navbar = () => {
  return (
    <nav className=' bg-purple-950 text-white sticky top-0 z-20'>
      <div className='md:container flex justify-between  items-center py-3 px-4 md:mx-auto md:py-4 md:px-40'>
        <Logo />
        <ul className=' flex md:gap-5 gap-2 font-semibold'>
          <li className=' md:text-[16px] text-[12px]'> <a href='#'>Home</a> </li>
          <li className=' md:text-[16px] text-[12px]'> <a href='#'>About</a> </li>
          <li className=' md:text-[16px] text-[12px]'> <a href='#'>Contact</a> </li>
          <li className=' md:text-[16px] text-[12px]'> <a href='#'>Help</a> </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar