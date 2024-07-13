import { authApiRequest } from "@/configs/apiUrl/authApi";
import { LoginBodyType } from "@/schema/auth";
import { cookies } from "next/headers";
import { HttpError } from "@/core/error";
import { GLOBAL_VARIABLE } from "@/constant/common";
import { handleSetCookieToken } from "@/utils/handleSetCookieToken";

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType;
  const cookieStore = cookies();
  try {
    const { payload } = await authApiRequest.s_Login(body);

    // const { accessToken, refreshToken } = payload.data;
    const { access: accessToken, refresh: refreshToken } = payload.data;
    console.log({ accessToken, refreshToken });
    // set token with cookie
    handleSetCookieToken({ cookieStore, accessToken, refreshToken });

    cookieStore.set("isLogin", "true", {
      path: "/",
      expires: new Date().getTime() + GLOBAL_VARIABLE.TIME_IS_LOGIN
    });

    return Response.json(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      });
    } else {
      return Response.json({
        message: "Internal Server Error",
        status: 500
      });
    }
  }
}
