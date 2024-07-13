"use client";

import React, { Suspense, useMemo } from "react";
import {
  useBukkenItemMstSearch,
  useGetBukkenClassMstAll,
  useGetLocationMstAll
} from "@/services/bukken";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { formSchema } from "./bukkenSchema";
import MyDialog from "@/components/shared/MyDialog";
import { MoreHorizontal } from "lucide-react";
import RelatedBukken from "./modals/relatedModal";
import Loading from "@/components/shared/Loading";
import EmployeeModal from "./modals/employeeModal";
import DepartmentModal from "./modals/departmentModal";

const BukkenRegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      progress: '',
      parent_bukken_uuid: '',
      bukken_num: '',
      bukken_name: '',
      zip_code: '',
      prefecture: '',
      municipality: '',
      district: '',
      town_village: '',
      house_number: '',
      building_name: '',
      site_name: '',
      bukken_class_uuid: '',
      location_uuid: '',
      contract_class: '',
      bukken_order: [],
      bukken_construct: [],
      own_manager_uuid: '',
      department_uuid: '',
      bukken_member: [],
      construct_start_dt: '',
      construct_end_dt: '',
      advanced_info: []
    }
  });

  const { data: bukkenClassMstAll } = useGetBukkenClassMstAll();
  const { data: locationMstAll } = useGetLocationMstAll();
  const { data: dataType12 } = useBukkenItemMstSearch("12");
  const { data: dataType10 } = useBukkenItemMstSearch("10");


  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log({ data });
  }

  const RelatedMemo = useMemo(() => {
    return (
      <Suspense fallback={<Loading />}>
        <MyDialog
          trigger={
            <Button variant={"outline"} className="!mt-0 ml-4">
              <MoreHorizontal />
            </Button>
          }
          content={(value) => <RelatedBukken handlevalue={value} />}
          title="Table"
        />
      </Suspense>
    );
  }, [])

  const DepartmentMemo = useMemo(() => {
    return (
      <Suspense fallback={<Loading />}>
        <MyDialog
          trigger={
            <Button variant={"outline"} className="!mt-0 ml-4">
              <MoreHorizontal />
            </Button>
          }
          content={(value) => <DepartmentModal handleValue={value} />}
          title="Table"
        />
      </Suspense>
    );
  }, [])

  const EmployeeMemo = useMemo(() => {
    return (
      <Suspense fallback={<Loading />}>
        <MyDialog
          trigger={
            <Button variant={"outline"} className="!mt-0 ml-4">
              <MoreHorizontal />
            </Button>
          }
          content={(value) => <EmployeeModal handleValue={value} />}
          title="Table"
        />
      </Suspense>
    );
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (e) => console.log("error",e)
      )} >
        <div className="grid grid-cols-2 gap-x-6">
          <FormField
            control={form.control}
            name="progress"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>進捗状況</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger  >
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parent_bukken_uuid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>関連物件(親)</FormLabel>
                <div className="flex items-center">
                  <FormControl>
                    <Input placeholder="parent_bukken_uuid" {...field}  />
                  </FormControl>
                  { RelatedMemo }
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        { new Array(1).fill(0).map((_, index) => (
          <div key={index} className="grid grid-cols-2 gap-x-6">
          <FormField
            control={form.control}
            name="bukken_num"
            render={({ field }) => (
              <FormItem>
                <FormLabel>物件番号</FormLabel>
                <FormControl>
                  <Input placeholder="bukken_num" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bukken_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>請負区分</FormLabel>
                <FormControl>
                  <Input placeholder="bukken_name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        ))}

        <FormField
            control={form.control}
            name="department_uuid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>関連物件(親)</FormLabel>
                <div className="flex items-center">
                  <FormControl>
                    <Input placeholder="department_uuid" {...field}  />
                  </FormControl>
                  { DepartmentMemo }
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="own_manager_uuid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>関連物件(親)</FormLabel>
                <div className="flex items-center">
                  <FormControl>
                    <Input placeholder="employee" {...field}  />
                  </FormControl>
                 { EmployeeMemo }
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default BukkenRegisterForm;
