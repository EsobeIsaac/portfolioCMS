import Link from 'next/link'
import React from 'react'

const Footer:React.FC = () => {
  return (
    <footer className='bg-white p-4'>
        <p className='text-sm text-center'>&copy; {new Date().getFullYear()} Designed by <Link href={`https://www.linkedin.com/in/isaac-esobe-8864a4193/`}>Esobe Isaac</Link></p>
    </footer>
  )
}

export default Footer