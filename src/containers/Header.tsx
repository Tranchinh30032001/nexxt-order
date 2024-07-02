import React from 'react'
import { Navbar } from './Navbar'
import { ModeToggle } from '@/components/ToogleDarkMode'

const Header = () => {
  return (
    <section className='h-[var(--height-header)] border-b-2 container' >
      <div className='flex items-center justify-between h-full' >
        <Navbar />
        <ModeToggle />
      </div>
    </section>
  )
}

export default Header
