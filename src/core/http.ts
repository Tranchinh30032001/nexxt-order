import { request } from "@/configs/apiRequest";
import { getHandler, postHandler } from "@/utils/asyncHandler";
import { CustomOptions } from "@/utils/httpUtils";

class Http {
    static get<Response>(
      url: string,
      options?: Omit<CustomOptions, 'body'> | undefined
    ) {
      // return getHandler<Response>({ url, options })
    return request<Response>('GET', url, options)

    }

    static post<Response>(
      url: string,
      body: any,
      options?: Omit<CustomOptions, 'body'> | undefined
    ) {
      return postHandler<Response>({ url, body, options })
    // return request<Response>('POST', url, { ...options, body })

    }

    static put<Response>(
      url: string,
      body: any,
      options?: Omit<CustomOptions, 'body'> | undefined
    ) {
      return request<Response>('PUT', url, { ...options, body })
    }

    static delete<Response>(
      url: string,
      options?: Omit<CustomOptions, 'body'> | undefined
    ) {
      return request<Response>('DELETE', url, { ...options })
    }
  }

export default Http;
