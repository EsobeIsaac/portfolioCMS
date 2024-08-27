import React, { useEffect, useState, useContext } from 'react'
import InputField from '../../../components/textInput'
import RequestClass from '../../../components/requestClass'

import AlertContext from '@/app/admin/components/context/AlertContext'
import FileInput from '../../../components/fileUpload'
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'
import InputArea from '@/app/admin/components/textArea'


interface Portfolios {
    _id?: string,
    title: string,
    description: string,
    tag: string,
    url: string,
    image: string
  }

interface PortfolioFormProp {
  portfolio: Portfolios | null,
    fetchPortfolio: ()=>{}
}

const PortfolioForm: React.FC<PortfolioFormProp> = ({fetchPortfolio, portfolio}) => {

  const context = useContext(AlertContext)


    const [portfolioT, setPortfolioT] = useState<Portfolios>({
        title: ' ',
        description: ' ',
        tag: ' ',
        url: ' ',
        image: ' ',
    })

    useEffect(()=>{
        if(portfolio) {
            setPortfolioT(portfolio)
        }
    }, [portfolio])

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageSelect = (image: File) => {
        setSelectedImage(image);
      };
    
    
      const requestClass = new RequestClass('/api/v1/portfolio')

      const [loading, setLoading] = useState<Boolean>(false);
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPortfolioT({
          ...portfolioT,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const formData = new FormData();
        
        // formData.append('title', portfolioT.title);
      
        if (selectedImage) {
          formData.append('image', selectedImage);
        }

        for (const [key, value] of Object.entries(portfolioT)) {
          formData.append(key, value);
        }
      
        setLoading(true)
        try {
          const res = portfolio ? await requestClass.patchRequest(formData, portfolio?._id) : await requestClass.postRequest(formData);
          if(context?.alert) {
            context?.setAlert({
              message: res.data.message,
              status: res.data.status
            })
          }
          if(portfolio) {
              setPortfolioT(res.data.data)
          } else{
            setPortfolioT({
              title: ' ',
              description: ' ',
              tag: ' ',
              url: ' ',
              image: ' '
            })
          }
          await fetchPortfolio()
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
        <InputField label='Title:' name='title' value={portfolioT.title} onChange={handleInputChange} />

        <InputField label='Tag:' name='tag' value={portfolioT.tag} onChange={handleInputChange} />

        <InputField label='Portfolio Link:' name='url' value={portfolioT.url} onChange={handleInputChange} />

        <InputArea label='Description' name='description' value={portfolioT.description} onChange={handleInputChange}/>

        <FileInput label="image:" name="image" onImageSelect={handleImageSelect} bannerImage={portfolio?.image}/>
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

export default PortfolioForm;