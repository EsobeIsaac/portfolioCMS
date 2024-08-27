'use client'
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import RequestClass from '@/app/admin/components/requestClass';
import AlertContext from '@/app/admin/components/context/AlertContext'
import { CiEdit } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbReload } from "react-icons/tb";
import { GiCheckMark } from "react-icons/gi";
import { FaXmark } from "react-icons/fa6";
import { MdOutlineMailOutline, MdWifiCalling3, MdOutlineWhatsapp } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import ContactForm from './ContactForm';
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'

const ContactsComponent: React.FC = () => {

  const context = useContext(AlertContext)

  interface Contacts {
    _id: string,
    active: boolean,
    address: string,
    contactType: string
  }

  const [contacts, setContacts] = useState<Contacts[] | []>([])

  const [loading, setLoading] = useState<Boolean>(false);
  
  const requestClass = new RequestClass('/api/v1/contact')

  const fetchContacts = async() => {
    setLoading(true)
    setContacts([])
    try {
      const res = await requestClass.getRequest()

      for(let key in res.data.data) {
          setContacts((prevState)=>([
            ...prevState,
            {
              ...res.data.data[key],
              contactType: key
            }
          ]))
      }

      console.log(contacts)
    
      // setContacts(res.data.data)
      setLoading(false)
    } catch (err: any) {
      if (err.response) {
        if(context?.alert) {
          context?.setAlert({
            message: err.response.data.message,
            status: err.response.data.status
          })
        }
      } else {
        console.log(err);
      }
      setLoading(false)
    } 
    
  }

 
  useEffect(()=>{
    fetchContacts()
  }, [])

  interface showContactFormInterface {
    command: Boolean,
    contact?: Contacts
  }

  const [showContactForm, setShowContactForm] = useState<showContactFormInterface >({
    command: false,
  })

  const closeContactForm = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if(target.classList.contains('close')) {
      setShowContactForm({command: false})
    }
  }

  return (
    <section className='py-14'>
      <div className="flex justify-between items-center mb-5">
        <h2 className='text-xl font-semibold text-slate-700 mb-0'>CONTACTS: </h2>
        {
          loading ? <LoadingBtn/> : <button className="text-slate-700 bg-white text-3xl p-2 rounded-[100%]" onClick={fetchContacts}><TbReload/></button>
        } 
      </div>
   
      {  
        contacts && contacts[0] ? (
          <div className='grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4'>
            {
              contacts.map((item, index)=><div className='col-span-1 bg-white shadow-xl p-2 pb-8 relative' key={index}>
                  <div className={`text-md text-white p-2 rounded-[100%] ml-3 absolute top-0 right-0 ${item.active === true ? 'bg-green-500' : 'bg-red-500'}`}>
                    {item.active === true ? <GiCheckMark/> : <FaXmark/>}
                  </div>
                  <div className="mx-auto text-[30px] text-slate-700 text-center">
                    {
                      item.contactType === 'email' && <MdOutlineMailOutline className="mx-auto"/> 
                    }
                    {
                      item.contactType === 'phone' && <MdWifiCalling3 className="mx-auto"/> 
                    }
                    {
                      item.contactType === 'linkedIn' && <FaLinkedin className="mx-auto"/> 
                    }
                    {
                      item.contactType === 'whatsApp' && <MdOutlineWhatsapp className="mx-auto"/> 
                    }
                    
                </div>
                <div className='my-4 text-center'>
                  <h5 className='text-sm'>{item.contactType.toUpperCase()}</h5>
                    {
                      item.contactType === 'email' && <a href={`mailto:${item.address}`} target='_blank' className='text-md font-semibold mb-2'>{item.address}</a>
                    }
                    {
                      item.contactType === 'phone' && <a href={`tel:${item.address}`} target='_blank' className='text-md font-semibold mb-2'>{item.address}</a> 
                    }
                    {
                      item.contactType === 'linkedIn' && <a href={item.address} target='_blank' className='text-md font-semibold mb-2'>{item.address.split('in/')[1]}</a>  
                    }
                    {
                      item.contactType === 'whatsApp' && <a href={`https://wa.me/${item.address}`} target='_blank' className='text-md font-semibold mb-2'>{item.address}</a> 
                    }
                </div>
                <div className='p-2 w-fit ml-auto absolute bottom-0 right-0'>
                    <button className='bg-slate-700 text-white text-md p-2 rounded-[100%]' onClick={()=>setShowContactForm({command: true, contact: item})}><CiEdit /></button>                    
                </div>
              </div>)
            }
          </div>
        ) : null
      }

      {
        showContactForm.contact ? <article className='absolute left-0 flex items-center justify-center top-0 bg-black/25 min-h-full w-full close py-10' onClick={closeContactForm}>
        <div className='bg-white rounded-xl p-5 min-w-[90%] md:min-w-[50%] shadow-3xl'>
          <button className='text-2xl font-bold text-red-500 p-4 w-fit shadow-md close'>&times;</button>
          <ContactForm contact={ showContactForm.contact} fetchContacts={fetchContacts}/>          
        </div>
      </article> : null
      }

      
    </section>
    
  );
};

export default ContactsComponent;
