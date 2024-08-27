import axiosInstance from '@/app/components/AxiosInstance'

const getWebContent = async() => {
    try{
        const result = await axiosInstance.get(('/api/v1/web-content'));
        return result.data
    }catch(err: any) {
        if(err.result) {
            console.log(err.result)
        }
    }
}

export default getWebContent;