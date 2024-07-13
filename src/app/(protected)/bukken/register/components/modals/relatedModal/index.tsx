'use client'

import useCustomTable from '@/hooks/useDataTable';
import { useBukkenSearch } from '@/services/bukken';
import { initialColumns } from './columnRelated';
import TableContainer from '@/components/shared/TableContainer';
import { valueProps } from '@/components/shared/MyDialog';


const RelatedBukken = ({ handlevalue }: { handlevalue: (object: valueProps) => void }) => {
  const { data: bukkenSearch } = useBukkenSearch({ data: { option: { info: { }}}})
  const {
    tableInstance,
    columns,
  } = useCustomTable({ initialData: bukkenSearch, initialColumns });

  return (
    <TableContainer table={tableInstance} columns={columns} field='parent_bukken_uuid' keyName='bukken_name' keyUuid='bukken_uuid' onChangeValue={handlevalue} />
  )
}

export default RelatedBukken
