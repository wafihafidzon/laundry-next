import axiosInstance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
const useGetOutlet = () => {
  return useQuery({
    queryFn: async () => {
      const res = await axiosInstance.get('/outlet');
      return res;
    }
  })
}

export default useGetOutlet