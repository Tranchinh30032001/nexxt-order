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
import { handleErrorApi } from "@/utils/common";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useBoundStore } from "@/core/zustand";
import { useRouter } from "next/navigation";

const FormLogin = () => {
  const router = useRouter()
  const loginMutation = useLoginMutation()
  const logoutMutation = useLogoutMutation()
  const searchParams = useSearchParams()
  const setIsAuth = useBoundStore((state) => state.setIsAuth);
  const flagLogout = useRef<Boolean | Promise<any>>(false)

  useEffect(() => {
    // when accessToken expired
    const isLogin = Cookies.get('isLogin') // tránh trường hợp refresh thì nó lại call api logout
    if (searchParams.get('forceLogout') && isLogin && !flagLogout.current) {
      flagLogout.current = logoutMutation.mutateAsync().then(() => {
        flagLogout.current = false
      })
    }
  }, [])

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      id: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginBodyType) => {
    if (loginMutation.isPending) return;
    try {
      await loginMutation.mutateAsync(data)
      toast({
        description: "login success",
      })
      setIsAuth(true)
      router.push('/dashboard')
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
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="@gmail.com" {...field} />
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
