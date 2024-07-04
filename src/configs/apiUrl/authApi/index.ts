import Http from "@/core/http";
import { AccountResType } from "@/schema/account";
import { LoginBodyType, LoginResType, LogoutBodyType } from "@/schema/auth";

/* Lưu ý các API được call từ phía client thì đã tự động được truyền accessToken vào
Authorization.
(Các api không có prefix s_ đứng đầu thì đều là các api sẽ được call từ phía client)
*/

export const authApiRequest = {
    s_Login: (body: LoginBodyType) => Http.post<LoginResType>('/auth/login', body),
    login: (body: LoginBodyType) => Http.post<LoginResType>('/api/auth/login', body, {
        baseUrl: ''
    }),
    /* cần truyền accessToken lên chỉ để truyền vào Authorization */
    s_Logout: (body: LogoutBodyType & {
      accessToken: string
    }) => Http.post<LogoutBodyType>('/auth/logout', {
      refreshToken: body.refreshToken
    }, {
      headers: {
        Authorization: `Bearer ${body.accessToken}`
      }
    }),
    // when call this api localstorage with be clear
    logout: (body: LogoutBodyType) => Http.post<LogoutBodyType>('/api/auth/logout', body, {
      baseUrl: ''
    })
}

export const accountApiRequest = {
  s_Me: (accessToken: string) => Http.get<AccountResType>('/accounts/me', {
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  }),
  me: () => Http.get<AccountResType>('/accounts/me')
}
