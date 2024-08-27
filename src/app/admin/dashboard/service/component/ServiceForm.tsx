import React, { useEffect, useState, useContext } from 'react'
import InputField from '../../../components/textInput'
import RequestClass from '../../../components/requestClass'

import AlertContext from '@/app/admin/components/context/AlertContext'
import FileInput from '../../../components/fileUpload'
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'
import InputArea from '@/app/admin/components/textArea'


interface Services {
    _id?: string,
    title: string,
    description: string,
    image: string
  }

interface ServiceFormProp {
  service: Services | null,
    fetchServices: ()=>{}
}

const ServiceForm: React.FC<ServiceFormProp> = ({fetchServices, service}) => {

  const context = useContext(AlertContext)


    const [serviceT, setServiceT] = useState<Services>({
        title: ' ',
        description: ' ',
        image: ' '
    })

    useEffect(()=>{
        if(service) {
            setServiceT(service)
        }
    }, [service])

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageSelect = (image: File) => {
        setSelectedImage(image);
      };
    
    
      const requestClass = new RequestClass('/api/v1/service')

      const [loading, setLoading] = useState<Boolean>(false);
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setServiceT((prevState)=>({  
          ...prevState,
          [name]: value,    
        }));
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const formData = new FormData();

        for(let key in serviceT) {
          formData.append(key, serviceT[key as keyof typeof serviceT]!);
        }
        
      
        if (selectedImage) {
          formData.append('image', selectedImage);
        }
      
        setLoading(true)
        try {
          const res = service ? await requestClass.patchRequest(formData, service?._id) : await requestClass.postRequest(formData);
          if(context?.alert) {
            context?.setAlert({
              message: res.data.message,
              status: res.data.status
            })
          }
          if(service) {
              setServiceT(res.data.data)
          } else{
            setServiceT({
              title: ' ',
              description: ' ',
              image: ' '
            })
          }
          await fetchServices()
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
      };

  return (
    <form className="py-10" onSubmit={handleSubmit}>
        <InputField label='Title:' name='title' value={serviceT.title} onChange={handleInputChange} />

        <InputArea label='Description' name='description' value={serviceT.description} onChange={handleInputChange}/>

        <FileInput label="image:" name="image" onImageSelect={handleImageSelect} bannerImage={service?.image}/>
        {selectedImage && (
            <div>
            <h2>Selected Image:</h2>
            <p>{selectedImage.name}</p>
            </div>
        )}

    

        {
          loading ? <div className="mt-10 w-full py-0 bg-slate-500 text-white/25 md:px-10 md:w-fit flex gap-5 items-center justify-center">Loading <LoadingBtn/></div> : <button type="submit" className="mt-10 w-full py-2 bg-slate-500 text-white md:px-10 md:w-fit">Submit</button>
        } 

    </form>
  )
}

export default ServiceForm;