import axiosInstance from '@/lib/axios';
import { useMutation } from '@tanstack/react-query'

const usePostWorker = ({onSuccess}) => {
  return useMutation({
    mutationFn: async (body) => {
      const res = await axiosInstance.post('/worker', body);
      return res
    }, onSuccess
  })
} 

export default usePostWorker