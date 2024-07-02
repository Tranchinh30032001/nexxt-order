import { authApiRequest } from '@/configs/apiUrl/authApi';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.login
  })
}
