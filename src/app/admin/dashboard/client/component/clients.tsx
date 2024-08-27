'use client'
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import RequestClass from '@/app/admin/components/requestClass';
import AlertContext from '@/app/admin/components/context/AlertContext'
import { CiEdit } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbReload } from "react-icons/tb";
import { RiDeleteBin3Line } from "react-icons/ri";
import ClientForm from './ClientForm';
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'

const ClientComponent: React.FC = () => {

  const context = useContext(AlertContext)

  interface Clients {
    _id: string,
    name: string,
    logo: string
  }

  const [clients, setClients] = useState<Clients[] | null>(null)

  const [loading, setLoading] = useState<Boolean>(false);
  
  const requestClass = new RequestClass('/api/v1/client')

  const fetchClients = async() => {
    setLoading(true)
    try {
      const res = await requestClass.getRequest()
      // console.log(res)
    
      setClients(res.data.data)
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

  const [deleting, setDeleting] = useState<Boolean>(false)

  const deleteClients = async(client: Clients) => {
    setDeleting(true)
    try {
      const res = await requestClass.deleteRequest(client?._id)
      console.log(res)
      if(context?.alert) {
        context?.setAlert({
          message: res.data.message,
          status: res.data.status
        })
      }
      await fetchClients()
      setDeleting(false)
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
      setDeleting(false)
    } 
    
  }

  useEffect(()=>{
    fetchClients()
  }, [])

  interface showClientFormInterface {
    command: Boolean,
    client?: Clients
  }

  const [showClientForm, setShowClientMenu] = useState<showClientFormInterface >({
    command: false,
  })

  const closeClientForm = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if(target.classList.contains('close')) {
      setShowClientMenu({command: false})
    }
  }

  return (
    <section className='py-14'>
      <div className="flex justify-between items-center mb-5">
        <h2 className='text-xl font-semibold text-slate-700 mb-0'>CLIENTS: </h2>
        {
          loading ? <LoadingBtn/> : <button className="text-slate-700 bg-white text-3xl p-2 rounded-[100%]" onClick={fetchClients}><TbReload/></button>
        } 
      </div>
   
      {  
        clients && clients[0] ? (
          <div className='grid grid-cols-3 gap-3 md:grid-cols-4'>
            {
              clients.map((item, index)=><div className='col-span-1 bg-white shadow-xl p-2' key={index}>
                  <div style={{ position: 'relative', height: '100px' }} className="w-[100%] mx-auto lg:w-[80%]">
                    <Image
                        src={item.logo}
                        alt={item.name}
                        sizes="100%"
                        fill
                        style={{
                          objectFit: 'contain',
                          position: 'absolute'
                        }}
                    />      
                </div>
                <div className='mt-5 w-fit ml-auto'>
                    <button className='bg-slate-700 text-white text-md p-2 rounded-[100%]' onClick={()=>setShowClientMenu({command: true, client: item})}><CiEdit /></button>
                    {
                      deleting ? <LoadingBtn/> : <button className='bg-red-500 text-md text-white p-2 rounded-[100%] ml-3' onClick={()=>deleteClients(item)}><RiDeleteBin3Line/></button>
                    }
                    
                </div>
              </div>)
            }
          </div>
        ) : null
      }

      <button className='bg-slate-700 font-bold absolute bottom-10 right-5 text-white text-3xl p-2 rounded-[100%]' onClick={()=>setShowClientMenu({command: true})}><IoIosAddCircleOutline /></button>

      {
        showClientForm.command ? <article className='absolute left-0 flex items-center justify-center top-0 bg-black/25 min-h-full w-full close py-10' onClick={closeClientForm}>
        <div className='bg-white rounded-xl p-5 min-w-[90%] md:min-w-[50%] shadow-3xl'>
          <button className='text-2xl font-bold text-red-500 p-4 w-fit shadow-md close'>&times;</button>
          
          <ClientForm client={showClientForm.client ? showClientForm.client : null} fetchClients={fetchClients}/>
        </div>
      </article> : null
      }

      
    </section>
    
  );
};

export default ClientComponent;
