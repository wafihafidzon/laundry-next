import axiosInstance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query'
const useGetWorker = () => {
  return useQuery({
    queryFn: async () => {
      const res = await axiosInstance.get('/worker');
      return res;
    }
  }) 
}

export default useGetWorker