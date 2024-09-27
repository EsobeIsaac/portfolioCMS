'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'
import AOS from 'aos'

interface ToolsInterface {
    _id?: string,
    name: string,
    logo: string
  }


const Experience: React.FC<any> = ({tool}) => {


    const [tools, setTools] = useState<ToolsInterface[]>([])

    useEffect(()=>{
        AOS.init();
        (async() => {
          const res = await axiosInstance.get('/api/v1/tool');
          console.log(res.data.data)
          setTools(res.data.data)
        })()
    }, [])

    return (
        <div>
            <div className='flex items-center space-x-5 mb-6'>
                <div className='w-20 h-[1px] bg-black'></div>
                <h2 className='text-md font-semibold'>{tool.title}</h2>
            </div>
            <ul className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    tools[0] && tools.map((item)=>(
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
        </div>
    )
}

export default Experience