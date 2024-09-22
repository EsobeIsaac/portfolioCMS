'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'

interface ClientInterface {
    _id: string,
    name: string,
    logo: string,
  }


const Clients: React.FC<any> = ({client}) => {


    const [clients, setClients] = useState<ClientInterface[]>([])

    useEffect(()=>{
        (async() => {
          const res = await axiosInstance.get('/api/v1/client');
          setClients(res.data.data)
        })()
    }, [])

    return (
        <section id='clients' className='min-h-screen flex justify-center items-center w-full'>
            {
                client ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 space-y-16 md:space-x-16 md:space-y-0 max-w-[1200px] px-[3%] pt-10 md:pt-20 pb-40 mx-auto md:items-start'>

                        <div className='col-span-1'>
                            <h2 className='text-[40px] md:text-[50px] font-bold mb-8 leading-[4rem]'>{client.title}</h2>
                            <p className='text-md md:text-lg'>{client.description}</p>
                        </div>

                        <div className='col-span-1 '>
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
                                    }) : null
                                }
                            </div>
                            
                        </div>
                        
                    </div>
                ) : null
            }
        </section>
    )
}

export default Clients