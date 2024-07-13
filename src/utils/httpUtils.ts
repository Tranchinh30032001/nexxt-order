import envConfig from "@/configs/config-env";
import { redirect } from "next/navigation";
import { normalizePath } from "./common";
import { LoginResType } from "@/schema/auth";
import { authApiRequest } from "@/configs/apiUrl/authApi";

export type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined
}

export const isClient = typeof window !== "undefined";

export const handleBodyData = (
  options: CustomOptions | undefined
): FormData | string | undefined => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body) {
    body = JSON.stringify(options.body)
  }
  return body;
};

export const getBaseHeaders = (
  body: FormData | string | undefined
): { [key: string]: string } => {
  return body instanceof FormData
    ? {}
    : {
        "Content-Type": "application/json",
      };
};

export const getAuthorizationHeader = (): string | undefined => {
  const accessToken = isClient && localStorage.getItem("accessToken");
  return accessToken ? `Bearer ${accessToken}` : undefined;
};
// Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
// Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server
export const getBaseUrl = (options: CustomOptions | undefined): string => {
  return options?.baseUrl === undefined
    ? envConfig.NEXT_PUBLIC_API_ENDPOINT
    : options.baseUrl;
};

export const handleAuthenticationError = async() => {
  if (isClient) {
    try {
      // xóa token trên cookie
      await authApiRequest.logout()
    } catch(error) {
      localStorage.clear()
    } finally {
      location.href = '/login'
    }
  }
  // server
  else {
    /*
    - Nếu call api ở server bị lỗi 401 (trong trường hợp token hợp lệ) thì chuyển về màn /login
    có thêm params là forceLogout để làm flag ở màn login, sao cho call API logout để xóa toàn bộ
    thông tin token có ở trong cookie và localstorage
    */
    redirect(`/login?forceLogout=true`)
  }
};

export const handleClientSideLogic = <TypeResponse>(
  url: string,
  payload: TypeResponse
): void => {
  const normalizePathUrl = normalizePath(url);
  if (
    normalizePathUrl === "api/auth/login"
  ) {
    // const { accessToken, refreshToken } = (payload as LoginResType).data;
    const { access: accessToken, refresh: refreshToken, active_company_uuid, user_type, dev_flg } = (payload as LoginResType).data;
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
    localStorage.setItem('active_company_uuid', active_company_uuid)
    localStorage.setItem('user_type', user_type.toString())
    localStorage.setItem('dev_flg', dev_flg.toString())
  }
  // logout
  else if (normalizePathUrl === "api/auth/logout") {
    localStorage.clear()
  }
};
