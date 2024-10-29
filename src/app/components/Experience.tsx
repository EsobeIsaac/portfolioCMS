'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'
import AOS from 'aos'
import LoadingSkeleton from './ui/LoadingSkeleton'

interface ExperienceInterface {
    _id: string,
    start: string,
    end: string,
    company: string,
    description: string,
    title: string,
  }


const Experience: React.FC<any> = ({experience}) => {


    const [experiences, setExperiences] = useState<ExperienceInterface[]>([])
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(()=>{
        AOS.init();
        (async() => {
          const res = await axiosInstance.get('/api/v1/experience');
          console.log(res.data.data)
          setExperiences(res.data.data)
          setLoading(false)
        })()
    }, [])

    return (
        <div>
            <div className='flex items-center space-x-5 mb-4'>
                <div className='w-10 h-[1.2px] bg-black'></div>
                <h2 className='text-md font-semibold'>{experience.title}</h2>
            </div>
            {
                loading ? <LoadingSkeleton/> : experiences[0] ? (
                    <ul>
                        {
                            experiences.map((item)=>(
                                <li className="py-5" key={item._id} data-aos="fade-up">
                                    <h5 className='text-sm text-blue-500'>{item.start.replace(/-/g, '/')} - {item.end.replace(/-/g, '/')}</h5>
                                    <h5 className='text-xl md:text-2xl'>{item.company}</h5>
                                    <h5 className='text-md font-semibold mb-3'>{item.title}</h5>
                
                                    <p className='text-sm'>{item.description}</p>
                                </li>
                            ))
                        }
                    </ul>
                ) : <p className='text-md md:text-lg font-semibold'>No Experience Yet!</p>
            }
        </div>
    )
}

export default Experience