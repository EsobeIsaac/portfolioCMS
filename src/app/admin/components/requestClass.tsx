import axiosInstance from '@/app/components/AxiosInstance'

export default class RequestClass {
    constructor(public url: string) { }

    async getRequest() {
        const response = await axiosInstance.get(this.url, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem('token')
          },
        });
        return response
    }

    async patchRequest(body: object, path?: string) {
        const response = await axiosInstance.patch([this.url, '/', path && path].join(''), body, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': localStorage.getItem('token')
            },
          });      
        return response
    }

    async postRequest(body: object) {
      const response = await axiosInstance.post(this.url, body, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem('token')
          },
        });      
      return response
    }

    async deleteRequest(path: string) {
      const response = await axiosInstance.delete([this.url, '/', path && path].join(''), 
        {
          headers: {
            'Authorization': localStorage.getItem('token')
          },
        }
      );      
      return response
    }
}