'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'
import LoadingSkeleton from './ui/LoadingSkeleton'

interface ClientInterface {
    _id: string,
    name: string,
    logo: string,
  }


const Clients: React.FC<any> = ({client}) => {


    const [clients, setClients] = useState<ClientInterface[]>([])
    const [loading, setLoading] = useState<Boolean>(true)

    useEffect(()=>{
        (async() => {
          const res = await axiosInstance.get('/api/v1/client');
          setClients(res.data.data)
          setLoading(false)
        })()
    }, [])

    return (
        <section id='clients' className='min-h-screen flex justify-center items-center w-full'>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-16 max-w-[1200px] px-[3%] pt-10 md:pt-20 md:pb-40 mx-auto md:items-start'>

                <div className='col-span-1'>
                    <h2 className='text-[40px] md:text-[50px] font-bold mb-8 leading-[4rem]'>{client.title}</h2>
                    <p className='text-md md:text-lg'>{client.description}</p>
                </div>

                <div className='col-span-1 '>
                    {
                        loading ? <LoadingSkeleton/> : (
                            <div className='grid grid-cols-3'>
                                {
                                    clients[0] ? clients.map(item => {
                                        return(
                                            <div className='col-span-1' key={item._id}>
                                            <div style={{ position: 'relative', width: '100%', height: '100px' }}>
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
                                        </div>
                                        )
                                    }) : <div className='col-span-3'>
                                    <p className='text-md md:text-lg text-center font-semibold'>No Clients Yet!</p>
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

export default Clients