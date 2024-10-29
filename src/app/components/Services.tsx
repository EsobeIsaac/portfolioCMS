'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'
import AOS from 'aos';
import LoadingSkeleton from './ui/LoadingSkeleton'

interface ServiceInterface {
    _id: string,
    title: string,
    description: string,
    image: string,
  }


const Services: React.FC<any> = ({service, ctaBtn}) => {


    const [services, setServices] = useState<ServiceInterface[]>([])
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(()=>{
        AOS.init();
        (async() => {
          const res = await axiosInstance.get('/api/v1/service');
          console.log(res.data.data)
          setServices(res.data.data)
          setLoading(false)
        })()
    }, [])

    return (
        <section id='services' className='min-h-screen flex justify-center items-center w-full'>
            {
                services ? (
                    <div className=' max-w-[1200px] px-[3%] py-20 mx-auto items-center'>

                            <h2 className='text-[35px] md:text-[50px] font-bold mb-8 leading-[2.5rem] md:leading-[4rem] text-center'>{service.title}</h2>
                            <p className='text-md md:text-lg text-center'>{service.description}</p>

                                {
                                    loading ? <LoadingSkeleton/> : services[0] ? (
                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 gap-5'>
                                            {
                                                services.map((item, index) => {
                                                    return(
                                                        <div className='col-span-1 text-center bg-white shadow-xl px-3 py-8' key={index} data-aos="fade-up">
                                                            <div style={{ position: 'relative', width: '50px', height: '50px', margin: 'auto' }} className="shadow-md rounded-full p-4">
                                                                <Image
                                                                src={item.image}
                                                                alt="Picture of the author"
                                                                sizes="100%"
                                                                fill
                                                                style={{
                                                                    objectFit: 'contain',
                                                                    inset: 1
                                                                }}
                                                                />
                                                            </div>
                                                            <h2 className='text-lg my-5 font-semibold'>{item.title}</h2>
                                                            <p>{item.description}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    ) : <p className='text-md md:text-lg text-center font-semibold'>No Services Yet!</p>
                                }
                            
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