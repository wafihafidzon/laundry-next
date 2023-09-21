import axiosInstance from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const useDeleteOutlet = ({onSuccess}) => {
  return useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/outlet/${id}`)
      return res
    }, onSuccess
  })
}

export default useDeleteOutlet