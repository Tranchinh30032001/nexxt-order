import envConfig from "@/configs/config-env";
import { redirect } from "next/navigation";
import { normalizePath } from "./common";
import { LoginResType } from "@/schema/auth";

let clientLogoutRequest: null | Promise<any> = null;
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

export const handleAuthenticationError = async (
  options: CustomOptions | undefined,
  baseHeaders: { [key: string]: string }
): Promise<void> => {
  if (isClient) {
    if (!clientLogoutRequest) {
      clientLogoutRequest = fetch("/api/auth/logout", {
        method: "POST",
        body: null, // luon luon thanh cong ke ca accessToken khong hop le
        headers: {
          ...baseHeaders,
        } as any,
      });
      try {
        await clientLogoutRequest
      } catch (error) {
      } finally {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        clientLogoutRequest = null
        location.href = "/login"
      }
    }
  }
  // server
  else {
    const accessToken = (options?.headers as any)?.Authorization.split(
      "Bearer "
    )[1];
    redirect(`/logout?accessToken=${accessToken}`)
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
    const { accessToken, refreshToken } = (payload as LoginResType).data;
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
  }
  // logout
  else if (normalizePathUrl === "api/auth/logout") {
    localStorage.clear()
  }
};
