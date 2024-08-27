'use client'
import React, { useState, useEffect, useContext } from 'react';
import TextInput from '@/app/admin/components/textInput';
import TextArea from '@/app/admin/components/textArea';
import RequestClass from '@/app/admin/components/requestClass';
import getWebContent from '@/app/admin/components/getWebContents'
import AlertContext from '@/app/admin/components/context/AlertContext'
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn';

const ServiceIntroComponent: React.FC = () => {

  const context = useContext(AlertContext)

  interface ServicesIntro {
    [index: string] : string
  }

  const [serviceIntro, setServiceIntro] = useState<ServicesIntro | null>(null)

  useEffect(()=>{
    (async() => {
      const serviceIntroRes = await getWebContent()
      setServiceIntro(serviceIntroRes.data.service)
    })()
  }, [])
  
  const [requesting, setRequesting] = useState<Boolean>(false);

  const requestClass = new RequestClass('/api/v1/web-content')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setServiceIntro({
      ...serviceIntro,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setRequesting(true)
  
    const formData = new FormData();
  
    for (let key in serviceIntro) {
      console.log(serviceIntro[key as keyof typeof serviceIntro]);
      formData.append(key, serviceIntro[key as keyof typeof serviceIntro]);
    }
  
    formData.append("tag", "service");
  
    // Log FormData entries
    for (let entry in formData.entries()) {
      console.log(entry[0], entry[1]);
    }
  
    try {
      const res = await requestClass.patchRequest(formData);
      if(context?.alert) {
        context?.setAlert({
          message: res.data.message,
          status: res.data.status
        })
      }
      setServiceIntro(res.data.data)
      setRequesting(false)
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
      setRequesting(false)
    }
  };
  

  return (
    serviceIntro ? (
      <form onSubmit={handleSubmit}>
        <h2 className='text-xl font-semibold text-slate-700 mb-5'>SERVICE INTRO SECTION:</h2>

      <TextInput
        label="Title"
        name="title"
        value={serviceIntro.title}
        onChange={handleInputChange}
      />
      <TextArea
        label="Description"
        name="description"
        value={serviceIntro.description}
        onChange={handleInputChange}
      />

        {
          requesting ? <div className="mt-10 w-full py-0 bg-slate-500 text-white/25 md:px-10 md:w-fit flex gap-5 items-center justify-center">Loading <LoadingBtn/></div> : <button type="submit" className="mt-5 w-full py-2 bg-slate-500 text-white md:px-10 md:w-fit">Submit</button>
        }
      
    </form>
    ) : null
  );
};

export default ServiceIntroComponent;
