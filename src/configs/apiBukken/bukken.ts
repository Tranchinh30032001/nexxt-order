import Http from "@/core/http";
import { isClient } from "@/utils/httpUtils";

const active_company_uuid = isClient && localStorage.getItem('active_company_uuid')

export type LocationType = {
  location_uuid: string;
  location_name: string;
  index: number | null;
  creator_name: string;
  updater_name: string;
  create_dt: string;
  update_dt: string;
  used: number;
}

export type InfoItem = {
  bukken_class_uuid: string;
  bukken_class_name: string;
  index: number;
  creator_name: string;
  updater_name: string;
  create_dt: string;
  update_dt: string;
  used: number;
}

export const bukkenApi = {
  bukken_class_mst_all: () => Http.get<{ status: number, data: { info: InfoItem[] }}>(`/bukken-manager/bukken-class-mst/all/${active_company_uuid}`),
  bukken_item_mst_search: (body: { data: { info: { type: string } } }) => Http.post<any>(`/bukken-manager/bukken-item-mst/search/${active_company_uuid}`, body),
  location_mst_all: () => Http.get<{ status: number, data: { info: LocationType[] }}>(`/bukken-manager/location-mst/all/${active_company_uuid}`),
  bukken_search: (body: { data: { option: { info: { }}}}) => Http.post<any>(`/bukken-manager/bukken/search/${active_company_uuid}`, body),
  employee_search: (body: { data: { info: { }}}) => Http.post<any>(`/company-manager/employee/search/${active_company_uuid}`, body),
  department_info: () => Http.get<any>(`/company-manager/department/info/${active_company_uuid}`),
}
