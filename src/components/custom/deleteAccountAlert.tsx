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
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface AccountAlertProps {
  label: string
  description?: string
  icon?: ReactNode
  action?: () => void
  title: string
  isAction?: boolean
  size?: 'sm' | 'lg' | 'default' | 'icon'
  classname?: string
  contentClassnName?: string
}

export default function DeleteAccountAlert({
  label,
  description,
  icon,
  action,
  title,
  isAction = true,
  classname,
  contentClassnName,
  size = 'sm',
}: AccountAlertProps) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant={'secondary'} className={classname} size={size}>
            {icon}
            {label}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className={contentClassnName}>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete, now</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
