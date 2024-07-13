import TableContainer from '@/components/shared/TableContainer';
import useCustomTable from '@/hooks/useDataTable';
import { useEmployeeSearch } from '@/services/bukken';
import React from 'react'
import { initialColumns } from './columnEmployee';
import { valueProps } from '@/components/shared/MyDialog';

const EmployeeModal = ({ handleValue }: {handleValue:(object: valueProps) => void}) => {
  const { data: employeeSearch } = useEmployeeSearch({ data: { info: { }}})
  const {
    tableInstance,
    columns,
  } = useCustomTable({ initialData: employeeSearch, initialColumns });

  return (
    <TableContainer table={tableInstance} columns={columns} field='own_manager_uuid' keyName='mail' keyUuid='employee_uuid' onChangeValue={handleValue}  />
  )
}

export default EmployeeModal
