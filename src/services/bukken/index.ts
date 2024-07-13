import { bukkenApi } from '@/configs/apiBukken/bukken';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';


export const useGetBukkenClassMstAll = () => {
  return useQuery({
    queryKey: ['bukken-class-mst-all'],
    queryFn: bukkenApi.bukken_class_mst_all
  })
}

export const useGetLocationMstAll = () => {
  return useQuery({
    queryKey: ['location-mst-all'],
    queryFn: bukkenApi.location_mst_all,
    select: (data) => data?.payload.data.info
  })
}

export const useBukkenItemMstSearch = (type: string ) => {
  return useQuery({
    queryKey: ['bukken-item-mst-search'],
    queryFn:() => bukkenApi.bukken_item_mst_search({ data: { info: { type }}}),
    select: (data) => data?.payload.data.info
  })
}

export const useBukkenSearch = (body: { data: { option: { info: { }}}}) => {
  return useSuspenseQuery({
    queryKey: ['bukken-search'],
    queryFn: () => bukkenApi.bukken_search(body),
    select: (data) => data?.payload.data.info
  })
}

export const useEmployeeSearch = (body: { data: { info: { }}}) => {
  return useSuspenseQuery({
    queryKey: ['employee-search'],
    queryFn: () => bukkenApi.employee_search(body),
    select: (data) => data?.payload?.data
  })
}

export const useDepartmentInfo = () => {
  return useSuspenseQuery({
    queryKey: ['department-info'],
    queryFn: bukkenApi.department_info,
    select: (data) => data?.payload.data
  })
}
