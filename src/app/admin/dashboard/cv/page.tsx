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

  interface Cv {
    [index: string] : string
  }

  const [cv, setCv] = useState<Cv | null>(null)

  useEffect(()=>{
    (async() => {
      const cvRes = await getWebContent()
      setCv(cvRes.data.cv)
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
    setCv({
      ...cv,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequesting(true)
    const formData = new FormData();
  
    for (let key in cv) {
      console.log(cv[key as keyof typeof cv]);
      formData.append(key, cv[key as keyof typeof cv]);
    }
  
    formData.append("tag", "cv");
  
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
      setCv(res.data.data)
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
    cv ? (
      <form onSubmit={handleSubmit}>
      <TextInput
        label="CV Download Text"
        name="alt"
        value={cv.text}
        onChange={handleInputChange}
      />

        <FileInput label="CV (PDF)" name="imageUpload" onImageSelect={handleImageSelect} bannerImage={cv.image}/>
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
