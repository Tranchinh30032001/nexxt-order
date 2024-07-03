import { request } from "@/configs/apiRequest";

export const getHandler = async<Response> ({ url, options }: { url: string, options: any}) => {
  try {
    return await request<Response>('GET', url, options)
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw new Error(error)
    }
  }
};

export const postHandler = async<Response>({ url, options, body }: { url: string, options: any, body: any}) => {
  try {
    return await request<Response>('POST', url, { ...options, body })
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw new Error(error)
    }
    throw error;
  }
};
