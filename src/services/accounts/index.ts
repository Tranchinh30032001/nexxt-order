import { accountApiRequest } from "@/configs/apiUrl/authApi"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"

export const useGetAccounts = () => {
  return useQuery({
    queryKey: ['getAccounts'],
    queryFn: accountApiRequest.getAccounts,
    select: (data) => data.payload.data
  })
}
