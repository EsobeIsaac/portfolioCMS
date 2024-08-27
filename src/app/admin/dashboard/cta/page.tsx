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

  interface Cta {
    [index: string] : string
  }

  const [cta, setCta] = useState<Cta | null>(null)

  useEffect(()=>{
    (async() => {
      const ctaRes = await getWebContent()
      setCta(ctaRes.data.cta)
    })()
  }, [])
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = (image: File) => {
    setSelectedImage(image);
  };


  const [requesting, setRequesting] = useState<Boolean>(false);

  const requestClass = new RequestClass('/api/v1/web-content')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCta({
      ...cta,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequesting(true)
    const formData = new FormData();
  
    for (let key in cta) {
      console.log(cta[key as keyof typeof cta]);
      formData.append(key, cta[key as keyof typeof cta]);
    }
  
    formData.append("tag", "cta");
  
    if (selectedImage) {
      formData.append('image', selectedImage);
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
      setCta(res.data.data)
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
    cta ? (
      <form onSubmit={handleSubmit}>
      <TextInput
        label="Job Title"
        name="title"
        value={cta.title}
        onChange={handleInputChange}
      />
      <InputArea
        label="CTA Paragraph"
        name="description"
        value={cta.description}
        onChange={handleInputChange}
      />

        <FileInput label="Image" name="imageUpload" onImageSelect={handleImageSelect} bannerImage={cta.image}/>
        {selectedImage && (
            <div>
            <h2>Selected Image:</h2>
            <p>{selectedImage.name}</p>
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
