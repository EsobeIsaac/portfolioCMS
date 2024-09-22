'use client'
import React, { useState, useEffect, useContext } from 'react';
import TextInput from '@/app/admin/components/textInput';
import TextArea from '@/app/admin/components/textArea';
import RequestClass from '@/app/admin/components/requestClass';
import getWebContent from '@/app/admin/components/getWebContents'
import AlertContext from '@/app/admin/components/context/AlertContext'
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn';

const ClientIntroComponent: React.FC = () => {

  const context = useContext(AlertContext)

  interface ClientIntro {
    [index: string] : string
  }

  const [clientIntro, setClientIntro] = useState<ClientIntro | null>(null)

  useEffect(()=>{
    (async() => {
      const clientIntroRes = await getWebContent()
      setClientIntro(clientIntroRes.data.client)
    })()
  }, [])
  
  const [requesting, setRequesting] = useState<Boolean>(false);

  const requestClass = new RequestClass('/api/v1/web-content')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientIntro({
      ...clientIntro,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setRequesting(true)
  
    const formData = new FormData();
  
    for (let key in clientIntro) {
      console.log(clientIntro[key as keyof typeof clientIntro]);
      formData.append(key, clientIntro[key as keyof typeof clientIntro]);
    }
  
    formData.append("tag", "client");
  
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
      setClientIntro(res.data.data)
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
    clientIntro ? (
      <form onSubmit={handleSubmit}>
        <h2 className='text-md md:text-xl font-semibold text-slate-700 mb-5'>CLIENTS INTRO SECTION:</h2>

      <TextInput
        label="Title"
        name="title"
        value={clientIntro.title}
        onChange={handleInputChange}
      />
      <TextArea
        label="Description"
        name="description"
        value={clientIntro.description}
        onChange={handleInputChange}
      />

        {
          requesting ? <div className="mt-10 w-full py-0 bg-slate-500 text-white/25 md:px-10 md:w-fit flex gap-5 items-center justify-center">Loading <LoadingBtn/></div> : <button type="submit" className="mt-5 w-full py-2 bg-slate-500 text-white md:px-10 md:w-fit">Submit</button>
        }
      
    </form>
    ) : null
  );
};

export default ClientIntroComponent;
