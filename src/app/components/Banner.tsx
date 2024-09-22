'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'

const Banner: React.FC<any> = ({banner, ctaBtn, cv}) => {


    return (
        <header id='home' className='min-h-screen flex justify-center items-center w-full'>
            {
                banner ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 max-w-[1200px] px-[3%] pt-5 pb-20 md:pt-20 mx-auto items-center space-y-10 md:space-y-0 md:space-x-16 mt-24'>
                        <div className='col-span-1 '>
                            <div style={{ position: 'relative', width: '100%' }} className='h-[400px] md:h-[500px]'>
                                <Image
                                    src={banner.image}
                                    alt="Picture of the author"
                                    sizes="100%"
                                    fill
                                    style={{
                                    objectFit: 'contain',
                                    }}
                                />
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className='flex items-center space-x-5 mb-8'>
                                <div className='w-20 h-[1px] bg-black'></div>
                                <h2 className='text-md'>{banner.title}</h2>
                            </div>
                            <h1 className='text-[45px] md:text-[60px] font-bold mb-6 leading-[4rem]'>{banner.headline}</h1>
                            <p className='text-md md:text-lg'>{banner.message}</p>
                            <div className='flex space-x-3 mt-8'>
                                <Link href={ctaBtn.link} target='_blank' className='bg-blue-700 text-white py-2 px-5'>{ctaBtn.title}</Link>
                                <Link href={cv.link} className='bg-gray-200 text-black py-2 px-5' download='cv.pdf'>{cv.text}</Link>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </header>
    )
}

export default Banner