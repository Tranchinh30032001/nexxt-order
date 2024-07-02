import Http from "@/core/http";
import { LoginBodyType, LoginResType } from "@/schema/auth";

export const authApiRequest = {
    s_Login: (body: LoginBodyType) => Http.post<LoginResType>('/auth/login', body),
    login: (body: LoginBodyType) => Http.post<LoginResType>('/api/auth/login', body, {
        baseUrl: ''
    }),
}