'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'

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

    useEffect(()=>{
        (async() => {
          const res = await axiosInstance.get('/api/v1/experience');
          console.log(res.data.data)
          setExperiences(res.data.data)
        })()
    }, [])

    return (
        <div id='experiences'>
            <div className='flex items-center space-x-5 mb-4'>
                <div className='w-20 h-[1px] bg-black'></div>
                <h2 className='text-md'>{experience.title}</h2>
            </div>
            <ul>
                {
                    experiences[0] && experiences.map((item)=>(
                        <li className="py-5" key={item._id}>
                            <h5 className='text-sm text-blue-500'>{item.start.replace(/-/g, '/')} - {item.end.replace(/-/g, '/')}</h5>
                            <h5 className='text-xl md:text-2xl'>{item.company}</h5>
                            <h5 className='text-md font-semibold mb-3'>{item.title}</h5>
        
                            <p className='text-sm'>{item.description}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Experience