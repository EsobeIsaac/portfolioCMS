'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'

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

    useEffect(()=>{
        (async() => {
          const res = await axiosInstance.get('/api/v1/education');
          console.log(res.data.data)
          setEducations(res.data.data)
        })()
    }, [])

    return (
        <div className='' id='education'>
            <div className='flex items-center space-x-5 mb-4'>
                <div className='w-20 h-[1px] bg-black'></div>
                <h2 className='text-md'>{education.title}</h2>
            </div>
            <ul>
                {
                    educations[0] && educations.map((item)=>(
                        <li className="py-5" key={item._id}>
                            <h5 className='text-sm text-blue-500'>{item.start.replace(/-/g, '/')} - {item.end.replace(/-/g, '/')}</h5>
                            <h5 className='text-2xl'>{item.school}</h5>
                            <h5 className='text-md font-semibold mb-3'>{item.degree}</h5>
        
                            <p className='text-sm'>{item.description}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Education