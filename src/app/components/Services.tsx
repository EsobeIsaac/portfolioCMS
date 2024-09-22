'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'

interface ServiceInterface {
    _id: string,
    title: string,
    description: string,
    image: string,
  }


const Services: React.FC<any> = ({service, ctaBtn}) => {


    const [services, setServices] = useState<ServiceInterface[]>([])

    useEffect(()=>{
        (async() => {
          const res = await axiosInstance.get('/api/v1/service');
          console.log(res.data.data)
          setServices(res.data.data)
        })()
    }, [])

    return (
        <section id='services min-h-screen flex justify-center items-center w-full'>
            {
                services ? (
                    <div className=' max-w-[1200px] px-[3%] py-20 mx-auto items-center'>

                            <h2 className='text-[40px] md:text-[50px] font-bold mb-8 leading-[4rem] text-center'>{service.title}</h2>
                            <p className='text-md md:text-lg text-center'>{service.description}</p>

                            <div className='md:grid md:grid-cols-4 mt-20 space-x-5'>
                                {
                                    services[0] ? services.map((item, index) => {
                                        return(
                                            <div className='col-span-1 text-center bg-white shadow-xl px-3 py-8' key={index}>
                                                <div style={{ position: 'relative', width: '80%', height: '100px', margin: 'auto' }}>
                                                    <Image
                                                    src={item.image}
                                                    alt="Picture of the author"
                                                    sizes="100%"
                                                    fill
                                                    style={{
                                                        objectFit: 'contain',
                                                    }}
                                                    />
                                                </div>
                                                <h2 className='text-md md:text-lg mt-5'>{item.title}</h2>
                                                <p>{item.description}</p>
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>
                            
                            <div className='mt-12'>
                                <Link href={ctaBtn.link} className='block hover:bg-blue-700 border w-full md:w-fit border-blue-500 text-blue-500 hover:text-white text-center py-4 px-6 md:mx-auto' target='_blank'>{ctaBtn.title}</Link>
                            </div>
                        
                    </div>
                ) : null
            }
        </section>
    )
}

export default Services