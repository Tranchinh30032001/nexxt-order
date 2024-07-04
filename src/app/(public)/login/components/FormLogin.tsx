'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginBody, LoginBodyType } from "@/schema/auth";
import { useLoginMutation, useLogoutMutation } from "@/services/auth";
import { toast } from "@/components/ui/use-toast";
import { getRefreshToken, handleErrorApi } from "@/utils/common";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";

const FormLogin = () => {
  const loginMutation = useLoginMutation()
  const logoutMutation = useLogoutMutation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const flagLogout = useRef<Boolean | Promise<any>>(false)

  useEffect(() => {
    // when accessToken expired
    const isLogin = Cookies.get('isLogin') // tránh trường hợp refresh thì nó lại call api logout
    if (searchParams.get('forceLogout') && isLogin && !flagLogout.current) {
      const refreshToken = getRefreshToken() as string
      flagLogout.current = logoutMutation.mutateAsync({ refreshToken }).then(() => {
        flagLogout.current = false
      })
    }
  }, [])

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginBodyType) => {
    if (loginMutation.isPending) return;
    try {
      const result = await loginMutation.mutateAsync(data)
      toast({
        description: result.payload.message,
      })
      router.push('/manage/dashboard')
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  return (
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} autoComplete='additional-name' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
  )
}

export default FormLogin
