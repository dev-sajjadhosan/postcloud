'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Smile } from 'lucide-react'
import { ReactNode } from 'react'

interface BtnProps {
  icon?: ReactNode
  label?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  variant?: 'default' | 'ghost' | 'secondary' | 'outline'
  action?: () => void
}

export default function TooltipBtn({
  icon = <Smile />,
  label = 'unknown',
  side,
  align,
  variant = 'ghost',
  action,
}: BtnProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <Button size={'icon'} variant={variant} onClick={action} type='button'>
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </>
  )
}
