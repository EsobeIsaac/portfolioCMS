'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import { MdDownloadForOffline } from "react-icons/md";
// interface CtaInterface {
//     _id: string,
//     title: string,
//     description: string,
//     image: string
// }

// interface CtaBtn {
//     _id: string,
//     title: string,
//     link: string,
// }

// interface Cv {
//     _id: string,
//     text: string,
//     link: string,
// }

// interface Cta {
//     cta: CtaInterface,
//     ctaBtn: CtaBtn,
//     cv: Cv
// }

const CtaBanner: React.FC<any> = ({cta, ctaBtn, cv}) => {


    return (
        <div className='relative justify-center flex px-[3%]'>
            <div className='absolute bottom-[-90px] md:shadow-2xl md:flex max-w-[900px] w-[95%] bg-white rounded-md items-start p-4'>
                <div style={{ position: 'relative', width: '150px', height: '150px' }} className='hidden md:block'>
                    <Image
                        src={cta.image}
                        alt="Picture of the author"
                        sizes="100%"
                        fill
                        style={{
                            objectFit: 'cover',
                        }}
                        className='rounded-full'
                    />
                </div>
                <div className='flex-grow md:mx-10 md:mt-5'>
                    <h2 className='text-md font-semibold'>{cta.title}</h2>
                    <p>{cta.description}</p>
                </div>
                <div className='flex flex-col space-y-5 mt-5'>
                    <Link href={ctaBtn.link} className='bg-blue-700 text-white py-2 px-3'>{ctaBtn.title}</Link>
                    <Link href={cv.link} className='bg-gray-200 text-black py-2 px-3 flex items-center' download='cv.pdf'><MdDownloadForOffline className='text-[#333] text-md md:text-lg mr-2'/> {cv.text}</Link>
                </div>
            </div>
        </div>
    )
}

export default CtaBanner