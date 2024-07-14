import { accountApiRequest } from "@/configs/apiUrl/authApi"
import { useSuspenseQuery } from "@tanstack/react-query"

export const useGetAccounts = () => {
  return useSuspenseQuery({
    queryKey: ['getAccounts'],
    queryFn: accountApiRequest.getAccounts,
    select: (data) => data.payload.data
  })
}
