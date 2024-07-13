import React, { memo, useCallback, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useFormContext } from 'react-hook-form'

type Props = {
  trigger: React.ReactNode,
  title: string,
  content: (value: (item: valueProps) => void) => JSX.Element
}

export type valueProps = {
  uuid: string,
  name: string
}

const MyDialog = ({ trigger, title, content }: Props) => {
  const [values, setValues] = useState<valueProps>({
    uuid: '',
    name: ''
  })

  const { setValue } = useFormContext()

  const handleValue = useCallback((values: valueProps) => {
    setValues(values)
  }, [])

  const handleSave = () => {
    setValue()
  }

  console.log({ values });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className='max-w-4xl ' >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className='max-h-[500px] overflow-auto'  >
              {content(handleValue)}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction  onClick={handleSave} >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default memo(MyDialog)
