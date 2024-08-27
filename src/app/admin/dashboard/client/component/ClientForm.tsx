import React, { useEffect, useState, useContext } from 'react'
import InputField from '../../../components/textInput'
import RequestClass from '../../../components/requestClass'

import AlertContext from '@/app/admin/components/context/AlertContext'
import FileInput from '../../../components/fileUpload'
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'


interface Clients {
    _id?: string,
    name: string,
    logo: string
  }

interface ClientFormProp {
    client: Clients | null,
    fetchClients: ()=>{}
}

const ClientForm: React.FC<ClientFormProp> = ({fetchClients, client}) => {

  const context = useContext(AlertContext)


    const [clientT, setClientT] = useState<Clients>({
        name: ' ',
        logo: ' '
    })

    useEffect(()=>{
        if(client) {
            setClientT(client)
        }
    }, [client])

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageSelect = (image: File) => {
        setSelectedImage(image);
      };
    
    
      const requestClass = new RequestClass('/api/v1/client')

      const [loading, setLoading] = useState<Boolean>(false);
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClientT({
          ...clientT,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const formData = new FormData();
        
        formData.append('name', clientT.name);
      
        if (selectedImage) {
          formData.append('logo', selectedImage);
        }
      
        setLoading(true)
        try {
          const res = client ? await requestClass.patchRequest(formData, client?._id) : await requestClass.postRequest(formData);
          if(context?.alert) {
            context?.setAlert({
              message: res.data.message,
              status: res.data.status
            })
          }
          if(client) {
              setClientT(res.data.data)
          } else{
            setClientT({
                name: ' ',
                logo: ' '
            })
          }
          await fetchClients()
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
        <InputField label='Name:' name='name' value={clientT.name} onChange={handleInputChange} />

        <FileInput label="Logo:" name="logo" onImageSelect={handleImageSelect} bannerImage={client?.logo}/>
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

export default ClientForm