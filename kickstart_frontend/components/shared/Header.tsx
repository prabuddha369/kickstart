
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <nav className='bg-gradient-to-tr from-[#191616] to-[#2f2f2f] flex items-center justify-between px-4 p-2 w-full'>
      <Image src='/logo.svg' width={219} height={200} alt='Kickstart logo' />
      <div className='flex items-center justify-center gap-3'>
        <button className='w-fit py-[9px] px-9 rounded-full bg-gradient-to-r from-[#2A86FF] to-[#195099] text-[16px] font-semibold'>
          Sign In
        </button>
        <button className='w-fit py-[9px] px-9 rounded-full bg-gradient-to-tr to-[#7A278F] from-[#150A35] text-[16px] font-semibold'>
          Contact Us
        </button>

      </div>
    </nav>  
  )
}

export default Header