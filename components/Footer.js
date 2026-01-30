import React from 'react'

const Footer = () => {
  return (
    <footer className='font-bold bg-gray-900 text-white px-4 flex items-center h-16 justify-center'>
        <p className='text-center'>Copyright &copy; {new Date().getFullYear()} | GetMeAChai | All rights reserved.</p>
    </footer>
  )
}

export default Footer
