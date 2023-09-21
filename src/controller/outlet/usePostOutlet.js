import axiosInstance from '@/lib/axios';
import { useMutation } from '@tanstack/react-query'

const usePostOutlet = ({onSuccess}) => {
  return useMutation({
    mutationFn: async (body) => {
      const res = await axiosInstance.post('/outlet', body);
      return res
    }, onSuccess
  })
} 

export default usePostOutlet