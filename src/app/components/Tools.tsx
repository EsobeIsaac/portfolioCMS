'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'
import AOS from 'aos'
import LoadingSkeleton from './ui/LoadingSkeleton'

interface ToolsInterface {
    _id?: string,
    name: string,
    logo: string
  }


const Experience: React.FC<any> = ({tool}) => {

    const [tools, setTools] = useState<ToolsInterface[]>([])
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(()=>{
        AOS.init();
        (async() => {
          const res = await axiosInstance.get('/api/v1/tool');
          console.log(res.data.data)
          setTools(res.data.data)
          setLoading(false)
        })()
    }, [])

    return (
        <div>
            <div className='flex items-center space-x-5 mb-6'>
                <div className='w-10 h-[1.2px] bg-black'></div>
                <h2 className='text-md font-semibold'>{tool.title}</h2>
            </div>
            {
                loading ? <LoadingSkeleton/> : tools[0] ? (
                    <ul className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {
                            tools.map((item)=>(
                                <li className="px-3 py-3 bg-gray-100 rounded-md text-center" key={item._id} data-aos="fade-left">
                                    <div style={{ position: 'relative', width: '40px', height: '40px', margin: 'auto' }}>
                                        <Image
                                            src={item.logo}
                                            alt={item.name}
                                            sizes="100%"
                                            fill
                                            style={{
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </div>
                                    <h4 className='mt-2 text-md'>{item.name}</h4>
                                </li>
                            ))
                        }
                    </ul>
                ) : <p className='text-md md:text-lg font-semibold'>No Tools!</p>
            }
        </div>
    )
}

export default Experience