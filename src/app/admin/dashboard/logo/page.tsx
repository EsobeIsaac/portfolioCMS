'use client'
import React, { useState, useEffect, useContext } from 'react';
import TextInput from '@/app/admin/components/textInput';
import FileInput from '@/app/admin/components/fileUpload';
import RequestClass from '@/app/admin/components/requestClass';
import getWebContent from '@/app/admin/components/getWebContents'
import AlertContext from '@/app/admin/components/context/AlertContext'
import LoadingBtn from '../../components/Loading/LoadingBtn';
import InputArea from '../../components/textArea';

const FormComponent: React.FC = () => {

  const context = useContext(AlertContext)

  interface Logo {
    [index: string] : string
  }

  const [logo, setLogo] = useState<Logo | null>(null)

  useEffect(()=>{
    (async() => {
      const logoRes = await getWebContent()
      setLogo(logoRes.data.logo)
    })()
  }, [])
  
  const [selected, setSelected] = useState<File | null>(null);

  const handleImageSelect = (image: File) => {
    setSelected(image);
  };


  const [requesting, setRequesting] = useState<Boolean>(false);

  const requestClass = new RequestClass('/api/v1/web-content')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLogo({
      ...logo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequesting(true)
    const formData = new FormData();
  
    for (let key in logo) {
      console.log(logo[key as keyof typeof logo]);
      formData.append(key, logo[key as keyof typeof logo]);
    }
  
    formData.append("tag", "logo");
  
    if (selected) {
      formData.append('image', selected);
    }
  
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
      setLogo(res.data.data)
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
    logo ? (
      <form onSubmit={handleSubmit}>
      <TextInput
        label="Job Title"
        name="alt"
        value={logo.alt}
        onChange={handleInputChange}
      />

        <FileInput label="Image" name="imageUpload" onImageSelect={handleImageSelect} bannerImage={logo.image}/>
        {selected && (
            <div>
            <h2>Selected Image:</h2>
            <p>{selected.name}</p>
            </div>
        )}

        {
          requesting ? <div className="mt-10 w-full py-0 bg-slate-500 text-white/25 md:px-10 md:w-fit flex gap-5 items-center justify-center">Loading <LoadingBtn/></div> : <button type="submit" className="mt-10 w-full py-2 bg-slate-500 text-white md:px-10 md:w-fit">Submit</button>
        }
    </form>
    ) : null
    
  );
};

export default FormComponent;
