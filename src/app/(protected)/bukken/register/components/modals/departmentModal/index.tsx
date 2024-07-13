import TableContainer from '@/components/shared/TableContainer';
import useCustomTable from '@/hooks/useDataTable';
import { useDepartmentInfo } from '@/services/bukken';
import React from 'react'
import { initialColumns } from './columnDepartment';
import { valueProps } from '@/components/shared/MyDialog';

const DepartmentModal = ({ handleValue }: { handleValue: (object: valueProps) => void}) => {
  const { data: departmentInfo } = useDepartmentInfo()

  type a = typeof departmentInfo
  const {
    tableInstance,
    columns,
  } = useCustomTable({ initialData: departmentInfo, initialColumns });

  return (
    <TableContainer table={tableInstance} columns={columns} field='department_uuid' keyName='department_code' keyUuid='department_uuid' onChangeValue={handleValue} />
  )
}

export default DepartmentModal
