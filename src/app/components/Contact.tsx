'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'
import { MdOutlineMailOutline, MdWifiCalling3, MdOutlineWhatsapp } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";

interface ContactInterface {
    email: {
        _id: string,
        active: boolean,
        address: string,
      },
      phone: {
        _id: string,
        active: boolean,
        address: string,
      },
      linkedIn: {
        _id: string,
        active: boolean,
        address: string,
      },
      whatsApp: {
        _id: string,
        active: boolean,
        address: string,
      },
  }


const Contacts: React.FC<any> = ({contact, ctaBtn}) => {


    const [contacts, setContacts] = useState<ContactInterface>()

    useEffect(()=>{
        (async() => {
          const res = await axiosInstance.get('/api/v1/contact');
          console.log(res.data.data)
          setContacts(res.data.data)
        })()
    }, [])

    return (
        <section id='contact'>
            {
                contacts ? (
                    <div className=' max-w-[1200px] px-[3%] py-20 mx-auto items-center'>

                        <div>

                            <h2 className='text-[50px] font-bold mb-8 leading-[4rem] text-center'>{contact.title}</h2>
                            <p className='text-lg text-center'>{contact.description}</p>

                            <div className='grid grid-cols-2 md:grid-cols-4 mt-20 gap-5'>
                                {
                                    contacts.email.active && <Link target='_blank' href={`mailto:${contacts.email.address}`} className='col-span-1 hover:bg-blue-300 hover:text-white text-center bg-white shadow-md px-3 py-8' key={contacts.email._id}>
                                    <MdOutlineMailOutline className="mx-auto text-3xl text-blue-500 mb-5"/>
                                    <p>Email Address</p>
                                    <h2 className='text-lg'>{contacts.email.address}</h2>
                                </Link>
                                }
                                {
                                    contacts.phone.active && <Link target='_blank' href={`tel:${contacts.phone.address}`} className='col-span-1 hover:bg-blue-300 hover:text-white text-center bg-white shadow-md px-3 py-8'>
                                    <MdWifiCalling3 className="mx-auto text-3xl text-blue-500 mb-5"/>
                                    <p>Call</p>
                                    <h2 className='text-lg'>{contacts.phone.address}</h2>
                                </Link>
                                }
                                {
                                    contacts.whatsApp.active && <Link target='_blank' href={`wa.me/${contacts.whatsApp.address}`} className='col-span-1 hover:bg-blue-300 hover:text-white text-center bg-white shadow-md px-3 py-8'>
                                    <MdOutlineWhatsapp className="mx-auto text-3xl text-blue-500 mb-5"/> 
                                    <p>Whatsapp</p>
                                    <h2 className='text-lg'>{contacts.whatsApp.address}</h2>
                                </Link>
                                }
                                {
                                    contacts.linkedIn.active && <Link target='_blank' href={contacts.linkedIn.address} className='col-span-1 hover:bg-blue-300 hover:text-white text-center bg-white shadow-md px-3 py-8'>
                                    <FaLinkedin className="mx-auto text-3xl text-blue-500 mb-5"/>
                                    <p>LinkedIn</p>
                                    <h2 className='text-lg '>{contacts.linkedIn.address.split('in/')[1]}</h2>
                                </Link>
                                }
                            </div>
                            
                            <div className='mt-12'>
                                <Link href={ctaBtn.link} className='block hover:bg-blue-700 border w-full md:w-fit border-blue-500 text-blue-500 hover:text-white text-center py-4 px-6 md:mx-auto' target='_blank'>{ctaBtn.title}</Link>
                            </div>
                        </div>
                        
                    </div>
                ) : null
            }
        </section>
    )
}

export default Contacts