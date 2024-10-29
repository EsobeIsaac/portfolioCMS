'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'
import AOS from 'aos'
import LoadingSkeleton from './ui/LoadingSkeleton'

interface EducationInterface {
    _id: string,
    start: string,
    end: string,
    school: string,
    description: string,
    degree: string,
  }


const Education: React.FC<any> = ({education}) => {


    const [educations, setEducations] = useState<EducationInterface[]>([])
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(()=>{
        (async() => {
          const res = await axiosInstance.get('/api/v1/education');
          console.log(res.data.data)
          setEducations(res.data.data)
          setLoading(false)
        })()
    }, [])

    return (
        <div className=''>
            <div className='flex items-center space-x-5 mb-4'>
                <div className='w-10 h-[1.2px] bg-black'></div>
                <h2 className='text-md font-semibold'>{education.title}</h2>
            </div>

            {
                loading ? <LoadingSkeleton/> : educations[0] ? (
                    <ul>
                        {
                            educations.map((item)=>(
                                <li className="py-5" key={item._id} data-aos="fade-right">
                                    <h5 className='text-sm text-blue-500'>{item.start.replace(/-/g, '/')} - {item.end.replace(/-/g, '/')}</h5>
                                    <h5 className='text-xl md:text-2xl'>{item.school}</h5>
                                    <h5 className='text-md font-semibold mb-3'>{item.degree}</h5>
                                    <p className='text-sm'>{item.description}</p>
                                </li>
                            ))
                        }
                    </ul>
                ) : <p className='text-md md:text-lg font-semibold'>No Educational Record Yet!</p>
            }
        </div>
    )
}

export default Education