import React, { useEffect, useState, useContext } from 'react'
import InputField from '../../../components/textInput'
import RequestClass from '../../../components/requestClass'

import AlertContext from '@/app/admin/components/context/AlertContext'
import FileInput from '../../../components/fileUpload'
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'
import InputArea from '@/app/admin/components/textArea'


interface Testimonial {
  _id?: string,
  name: string,
  profile: string,
  testimonial: string,
  image: string,
}

interface TestimonialFormProp {
    testimonial: Testimonial | null,
    fetchTestimonials: ()=>{}
}

const TestimonialForm: React.FC<TestimonialFormProp> = ({fetchTestimonials, testimonial}) => {

  const context = useContext(AlertContext)


    const [TestimonialT, setTestimonialT] = useState<Testimonial>({
        name: ' ',
        profile: ' ',
        testimonial: ' ',
        image: ' ',
    })

    useEffect(()=>{
        if(testimonial) {
            setTestimonialT(testimonial)
        }
    }, [testimonial])

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageSelect = (image: File) => {
        setSelectedImage(image);
      };
    
    
      const requestClass = new RequestClass('/api/v1/Testimonial')

      const [loading, setLoading] = useState<Boolean>(false);
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTestimonialT({
          ...TestimonialT,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const formData = new FormData();
        
        // Iterate through TestimonialT object and append each value
        for (const [key, value] of Object.entries(TestimonialT)) {
            formData.append(key, value);
        }
      
        if (selectedImage) {
          formData.append('image', selectedImage);
        }
      
        setLoading(true)
        try {
          const res = testimonial ? await requestClass.patchRequest(formData, testimonial?._id) : await requestClass.postRequest(formData);
          if(context?.alert) {
            context?.setAlert({
              message: res.data.message,
              status: res.data.status
            })
          }
          if(testimonial) {
              setTestimonialT(res.data.data)
          } else{
            setTestimonialT({
              name: ' ',
              profile: ' ',
              testimonial: ' ',
              image: ' ',
            })
          }
          await fetchTestimonials()
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
        <InputField label='Name:' name='name' value={TestimonialT.name} onChange={handleInputChange} />

        <InputField label='Profile:' name='profile' value={TestimonialT.profile} onChange={handleInputChange} />

        <InputArea label='Testimonial' name='testimonial' value={TestimonialT.testimonial} onChange={handleInputChange}/>

        <FileInput label="Logo:" name="logo" onImageSelect={handleImageSelect} bannerImage={testimonial?.image}/>
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

export default TestimonialForm