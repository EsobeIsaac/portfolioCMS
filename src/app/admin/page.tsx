"use client"

import {useState, useEffect, useContext} from 'react';

import { useRouter } from 'next/navigation';

import AlertContext from '@/app/admin/components/context/AlertContext';
import Alert from '@/app/admin/components/Alert';
import {AlertInterface} from '@/app/admin/components/Interface/AlertInterface';
import RequestClass from '@/app/admin/components/requestClass';
import loadingIcon from '@/app/utils/images/load.gif';
import Image from 'next/image';

function Admin() {

  const router = useRouter();

  const context = useContext(AlertContext)

  const requestClass = new RequestClass('/api/v1/user/me');

  const [user, setUser] = useState(null)

  useEffect(()=>{
    (async()=>{
      try {
        const res =  await requestClass.getRequest();
        setUser(res.data.user)
        router.push('/admin/dashboard')
      } catch (err: any) {
        if (err.response) {
          console.log(err.response)
          if(context?.alert) {
            context?.setAlert({
              message: err.response.data.message,
              status: err.response.data.status
            })
          }
        } else {
          console.log(err);
        }
        router.push('/admin/login')
      } 
    })()
  }, [window.location.pathname])
  return (
      <article className='flex items-center justify-center bg-white w-full h-screen'>
          <Image src={loadingIcon} height={150} width={150} alt='Loading..'/>
      </article>
  )
}

export default Admin