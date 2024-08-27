import React, { useEffect, useState, useContext } from 'react'
import InputField from '../../../components/textInput'
import RequestClass from '../../../components/requestClass'

import AlertContext from '@/app/admin/components/context/AlertContext'
import FileInput from '../../../components/fileUpload'
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'
import InputArea from '@/app/admin/components/textArea'


interface Achievements {
    _id?: string,
    title: string,
    description: string,
    image: string
  }

interface AchievementFormProp {
  achievement: Achievements | null,
    fetchAchievement: ()=>{}
}

const AchievementForm: React.FC<AchievementFormProp> = ({fetchAchievement, achievement}) => {

  const context = useContext(AlertContext)


    const [achievementT, setAchievementT] = useState<Achievements>({
        title: ' ',
        description: ' ',
        image: ' '
    })

    useEffect(()=>{
        if(achievement) {
            setAchievementT(achievement)
        }
    }, [achievement])

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageSelect = (image: File) => {
        setSelectedImage(image);
      };
    
    
      const requestClass = new RequestClass('/api/v1/achievement')

      const [loading, setLoading] = useState<Boolean>(false);
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAchievementT({
          ...achievementT,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const formData = new FormData();
        
        // formData.append('title', achievementT.title);
        for(let key in achievementT) {
          formData.append(key, achievementT[key as keyof typeof achievementT]!)
        }
      
        if (selectedImage) {
          formData.append('image', selectedImage);
        }
      
        setLoading(true)
        try {
          const res = achievement ? await requestClass.patchRequest(formData, achievement?._id) : await requestClass.postRequest(formData);
          if(context?.alert) {
            context?.setAlert({
              message: res.data.message,
              status: res.data.status
            })
          }
          if(achievement) {
              setAchievementT(res.data.data)
          } else{
            setAchievementT({
              title: ' ',
              description: ' ',
              image: ' '
            })
          }
          await fetchAchievement()
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
        <InputField label='Title:' name='title' value={achievementT.title} onChange={handleInputChange} />

        <InputArea label='Description' name='description' value={achievementT.description} onChange={handleInputChange}/>

        <FileInput label="image:" name="image" onImageSelect={handleImageSelect} bannerImage={achievement?.image}/>
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

export default AchievementForm;