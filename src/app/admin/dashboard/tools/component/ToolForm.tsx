import React, { useEffect, useState, useContext } from 'react'
import InputField from '../../../components/textInput'
import RequestClass from '../../../components/requestClass'

import AlertContext from '@/app/admin/components/context/AlertContext'
import FileInput from '../../../components/fileUpload'
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'


interface Tools {
    _id?: string,
    name: string,
    logo: string
  }

interface ToolFormProp {
  tool: Tools | null,
    fetchTools: ()=>{}
}

const ToolForm: React.FC<ToolFormProp> = ({fetchTools, tool}) => {

  const context = useContext(AlertContext)


    const [toolT, setToolT] = useState<Tools>({
        name: ' ',
        logo: ' '
    })

    useEffect(()=>{
        if(tool) {
            setToolT(tool)
        }
    }, [tool])

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageSelect = (image: File) => {
        setSelectedImage(image);
      };
    
    
      const requestClass = new RequestClass('/api/v1/tool')

      const [loading, setLoading] = useState<Boolean>(false);
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setToolT({
          ...toolT,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const formData = new FormData();
        
        formData.append('name', toolT.name);
      
        if (selectedImage) {
          formData.append('image', selectedImage);
        }
      
        setLoading(true)
        try {
          const res = tool ? await requestClass.patchRequest(formData, tool?._id) : await requestClass.postRequest(formData);
          if(context?.alert) {
            context?.setAlert({
              message: res.data.message,
              status: res.data.status
            })
          }
          if(tool) {
              setToolT(res.data.data)
          } else{
            setToolT({
                name: ' ',
                logo: ' '
            })
          }
          await fetchTools()
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
        <InputField label='Name:' name='name' value={toolT.name} onChange={handleInputChange} />

        <FileInput label="Logo:" name="image" onImageSelect={handleImageSelect} bannerImage={tool?.logo}/>
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

export default ToolForm;