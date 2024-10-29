'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import { MdDownloadForOffline } from "react-icons/md";
import AOS from 'aos'
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

    useEffect(()=>{
        AOS.init()
    }, [])

    return (
        <div className='relative justify-center flex px-[2%] py-20 md:py-0'>
            <div className='md:absolute bottom-[-90px] shadow-2xl md:flex max-w-[900px] w-[95%] bg-white rounded-md p-4' data-aos="fade-up">
                <div>
                    <div style={{ position: 'relative' }} className='h-[200px] w-full md:w-[150px] md:h-[150px] md:rounded-full mb-5 md:mb-0'>
                        <Image
                            src={cta.image}
                            alt="Picture of the author"
                            fill
                            style={{
                                objectFit: 'cover',
                                inset: 1
                            }}
                            className='md:rounded-full absolute'
                        />
                    </div>
                </div>
                <div className='flex-grow md:mx-10 md:mt-5'>
                    <h2 className='text-md font-semibold'>{cta.title}</h2>
                    <p>{cta.description}</p>
                </div>
                <div className='flex flex-col space-y-5 mt-5'>
                    <Link href={ctaBtn.link} className='bg-blue-700 text-white py-2 px-3'>{ctaBtn.title}</Link>
                    <Link href={cv.link} className='bg-gray-200 text-black py-2 px-3 flex items-center' download='cv.pdf'><MdDownloadForOffline className='text-[#333] text-md md:text-lg mr-2'/> {cv.text.split(' ')[0]}</Link>
                </div>
            </div>
        </div>
    )
}

export default CtaBanner