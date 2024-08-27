'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'

interface AchievementInterface {
    _id: string,
    title: string,
    description: string,
    image: string,
  }


const Services: React.FC<any> = ({achievement}) => {


    const [achievements, setAchievements] = useState<AchievementInterface[]>([])

    useEffect(()=>{
        (async() => {
          const res = await axiosInstance.get('/api/v1/achievement');
          console.log(res.data.data)
          setAchievements(res.data.data)
        })()
    }, [])

    return (
        <section id='achievements'>
            {
                achievements ? (
                    <div className=' max-w-[1200px] px-[3%] py-20 mx-auto items-center'>

                            <h2 className='text-[50px] font-bold mb-8 leading-[4rem] text-center'>{achievement.title}</h2>
                            <p className='text-lg text-center'>{achievement.description}</p>

                            <div className='md:grid grid-cols-2 mt-20 space-x-5'>
                                {
                                    achievements[0] ? achievements.map(item => {
                                        return(
                                            <div className='col-span-1 bg-gray-100 px-4 py-2 rounded-md' key={item._id}>
                                                <div className='flex gap-5'>
                                                <div style={{ position: 'relative', width: '150px', height: '150px' }}>
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
                                                <div>
                                                <h2 className='text-lg mt-5'>{item.title}</h2>
                                                <p>{item.description}</p>
                                                </div>
                                                </div>
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>
                            
                        
                    </div>
                ) : null
            }
        </section>
    )
}

export default Services