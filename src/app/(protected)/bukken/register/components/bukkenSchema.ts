import { z } from "zod";

const bukkenOrdererManagerSchema = z.object({
  bukken_orderer_manager_uuid: z.string(),
  bukken_orderer_manager_name: z.string()
});

const bukkenOrderSchema = z.object({
  bukken_order_uuid: z.string(),
  bukken_order_name: z.string(),
  bukken_orderer_manager: z.array(bukkenOrdererManagerSchema)
});

const bukkenConstructManagerSchema = z.object({
  bukken_construct_manager_uuid: z.string(),
  bukken_construct_manager_name: z.string()
});

const bukkenConstructSchema = z.object({
  bukken_construct_uuid: z.string(),
  bukken_construct_name: z.string(),
  bukken_construct_manager: z.array(bukkenConstructManagerSchema)
});

const bukkenMemberSchema = z.object({
  company_uuid: z.string(),
  employee_uuid: z.string()
});

const advancedInfoSchema = z.object({
  bukken_item_uuid: z.string(),
  bukken_item_name: z.string(),
  value: z.array(z.string()),
  value2: z.array(z.string())
});

export const formSchema = z.object({
  progress: z.string(),
  parent_bukken_uuid: z.string(),
  bukken_num: z.string(),
  bukken_name: z.string(),
  zip_code: z.string(),
  prefecture: z.string(),
  municipality: z.string(),
  district: z.string(),
  town_village: z.string(),
  house_number: z.string(),
  building_name: z.string(),
  site_name: z.string(),
  bukken_class_uuid: z.string(),
  location_uuid: z.string(),
  contract_class: z.string(),
  bukken_order: z.array(bukkenOrderSchema),
  bukken_construct: z.array(bukkenConstructSchema),
  own_manager_uuid: z.string(),
  department_uuid: z.string(),
  bukken_member: z.array(bukkenMemberSchema),
  construct_start_dt: z.string(),
  construct_end_dt: z.string(),
  advanced_info: z.array(advancedInfoSchema),
});

export type FormType = z.infer<typeof formSchema>;
