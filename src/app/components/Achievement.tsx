'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'
import AOS from 'aos';
import LoadingSkeleton from './ui/LoadingSkeleton'


interface AchievementInterface {
    _id: string,
    title: string,
    description: string,
    image: string,
  }


const Services: React.FC<any> = ({achievement}) => {


    const [achievements, setAchievements] = useState<AchievementInterface[]>([])
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(()=>{
        AOS.init();
        (async() => {
          const res = await axiosInstance.get('/api/v1/achievement');
          console.log(res.data.data)
          setAchievements(res.data.data)
          setLoading(false)
        })()
    }, [])

    return (
        <section id='achievements'>
            <div className=' max-w-[1200px] px-[3%] py-20 mx-auto items-center'>          
                <div>
                    <h2 className='text-[40px] md:text-[50px] font-bold mb-8 leading-[4rem] text-center'>{achievement.title}</h2>
                    <p className='text-md md:text-lg text-center'>{achievement.description}</p>
                    {
                        loading ? <LoadingSkeleton/> : (
                            <div className='grid grid-cols-1 md:grid-cols-2 mt-20 gap-5'>
                                {
                                    achievements[0] ? achievements.map((item, index) => {
                                        return(
                                            <div className='col-span-1 bg-white shadow-2xl p-[32px] rounded-md' key={item._id} data-aos={(index + 1) % 2 === 0 ? "fade-left" : "fade-right"}>
                                                <div className='flex gap-5'>
                                                    <div className='bg-gray-100  rounded-md w-[90px] h-[90px] p-[15px]'>
                                                        <div style={{ position: 'relative', width: '60px', height: '60px' }}>
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
                                                    </div>
                                                <div>
                                                <h2 className='text-md md:text-lg font-semibold mb-5'>{item.title}</h2>
                                                <p>{item.description}</p>
                                                </div>
                                                </div>
                                            </div>
                                        )
                                    }) : <div className='col-span-1 md:col-span-2'>
                                        <p className='text-md md:text-lg text-center font-semibold'>No Achievements Yet!</p>
                                    </div>
                                }
                            </div>
                        )
                    }
                </div>      
            </div>
        </section>
    )
}

export default Services