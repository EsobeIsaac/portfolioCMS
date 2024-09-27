'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '@/app/utils/images/BG.png'
import { CiSearch } from "react-icons/ci";
import { PiSlidersHorizontalLight, PiList } from "react-icons/pi";
import Link from 'next/link'
import classes from './NavBar.module.css';

export default function NavBar({logo, ctaBtn}) {

  const [showMenu, setShowMenu] = useState(false)

  // show mobile menu setter function
  const showMenuHandler = (payload) => {
    setShowMenu(payload)
  }


  // FOR MOBILE MENU
  useEffect(()=>{
    
    let sideMenu = document.getElementById('mobileMenuLayer')

    if (showMenu === false && window.innerWidth <= 1060) {
      sideMenu.style.right = "-101%";
    }else if(showMenu === true && window.innerWidth <= 1060)  {
      sideMenu.style.right = "0%";
    }
  }, [showMenu])


  const closeMenu = (e) => {
    if(e.target.classList.contains('link') || e.target.classList.contains('close') && window.innerWidth <= 1060 ) showMenuHandler(false)
  }



  return (
    <nav className='relative z-[99] px-[3%] py-5 md:py-8 max-w-[1200px] mx-auto flex items-center justify-between'>
      <Image src={logo.image} className='object-fill my-[-20px]' width={60} height={60} alt={logo.alt}/>
      
      <div className={`close ${classes.mobileMenuLayer}`} id='mobileMenuLayer' onClick={closeMenu}>
        <ul className={['flex items-center text-[16px] font-[500] space-x-4', classes.mobileMenu].join(' ')}>
          <li className={classes.menuCloseIcon}><button className='border-none outline-none text-2xl font-semibold text-red-600 close'>&times;</button></li>
          <li><a className='link' href='#home'>Home</a></li>
          {/* <li><a className='link' href='#clients'>Clients</a></li> */}
          <li><a className='link' href='#education'>Education</a></li>
          <li><a className='link' href='#experiences'>Experience</a></li>
          {/* <li><a className='link' href='#tools'>Tools</a></li> */}
          <li><a className='link' href='#portolio'>Portfolio</a></li>
          <li><a className='link' href='#services'>Services</a></li>
          <li><a className='link' href='#testimonials'>Testimonials</a></li>
          <li><a className='link' href='#achievements'>Achievements</a></li>
          <li><a className='link' href='#contact'>Contact Me</a></li>
          <li className={classes.ctaBtn}><a href={ctaBtn.link} className='hover:bg-blue-700 border w-full md:w-fit border-blue-500 text-blue-500 hover:text-white text-center py-2 px-4 link' target='_blank'>{ctaBtn.title}</a></li>
        </ul>
      </div>
      <div className={classes.mobileControl}>
        <button className={[classes.menuIcon, 'text-[35px] ml-5'].join(' ')} onClick={()=>{
          showMenuHandler(true)
        }}><PiList /></button>
      </div>
    </nav>
  )
}
