import axiosInstance from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const useUpdateOutlet = ({onSuccess}) => {
  return useMutation({
    mutationFn: async (body) => {
      const res = await axiosInstance.patch(`/outlet/${body.id}`, body)
      return res
    }, onSuccess
  })
}

export default useUpdateOutlet