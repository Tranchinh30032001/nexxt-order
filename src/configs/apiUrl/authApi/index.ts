import Http from "@/core/http";
import { AccountResType } from "@/schema/account";
import { LoginBodyType, LoginResType, LogoutBodyType, RefreshTokenBodyType, RefreshTokenResType } from "@/schema/auth";
import { DishListResType } from "@/schema/dish";

/* Lưu ý các API được call từ phía client thì đã tự động được truyền accessToken vào
Authorization.
(Các api không có prefix s_ đứng đầu thì đều là các api sẽ được call từ phía client)
*/

export const authApiRequest = {
    /* NEXT_ORDER */

    // s_Login: (body: LoginBodyType) => Http.post<LoginResType>('/auth/login', body),
    // login: (body: LoginBodyType) => Http.post<LoginResType>('/api/auth/login', body, {
    //     baseUrl: ''
    // }),
    // /* cần truyền accessToken lên chỉ để truyền vào Authorization */
    // s_Logout: (body: LogoutBodyType & {
    //   accessToken: string
    // }) => Http.post<LogoutBodyType>('/auth/logout', {
    //   refreshToken: body.refreshToken
    // }, {
    //   headers: {
    //     Authorization: `Bearer ${body.accessToken}`
    //   }
    // }),
    // // when call this api localstorage with be clear
    // logout: () => Http.post<LogoutBodyType>('/api/auth/logout', null, {
    //   baseUrl: ''
    // }),
    // s_RefreshToken: (body: RefreshTokenBodyType) => Http.post<RefreshTokenResType>('/auth/refresh-token', body),

    // refreshToken: () => Http.post<RefreshTokenResType>('/api/auth/refresh-token', null, {
    //   baseUrl: ''
    // })

    /* ANDES_CLOUD */

    s_Login: (body: LoginBodyType) => Http.post<LoginResType>('/user-manager/login', body),
    login: (body: LoginBodyType) => Http.post<LoginResType>('/api/auth/login', body, {
        baseUrl: ''
    }),
    /* cần truyền accessToken lên chỉ để truyền vào Authorization */
    s_Logout: (body: LogoutBodyType & {
      accessToken: string
    }) => Http.post<LogoutBodyType>('/user-manager/logout', {
      refreshToken: body.refreshToken
    }, {
      headers: {
        Authorization: `Bearer ${body.accessToken}`
      }
    }),
    // when call this api localstorage with be clear
    logout: () => Http.post<LogoutBodyType>('/api/auth/logout', null, {
      baseUrl: ''
    }),
    s_RefreshToken: (body: RefreshTokenBodyType) => Http.post<RefreshTokenResType>('/auth/refresh-token', body),

    refreshToken: () => Http.post<RefreshTokenResType>('/api/auth/refresh-token', null, {
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

export const dishesApiRequest = {
  getAllDishes: () => Http.get<DishListResType>('/dishes')
}
