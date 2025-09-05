import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import TooltipBtn from '@/components/custom/toolBtn'
import { IconRotate3d } from '@tabler/icons-react'

export default function CreateNew() {
  return (
    <>
      <div className="min-w-5xl mx-auto p-5">
        <h3 className="text-xl">Create New Project</h3>
        <form className="mt-7 flex flex-col gap-3.5">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <Label>Project Id</Label>
              <div className="flex items-center gap-2.5">
              <Input placeholder="Project234@id" />
                <TooltipBtn label='Generate' icon={<IconRotate3d/>} variant='default' />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Project Email</Label>
              <Input placeholder="Project234@id.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <Label>Project Name</Label>
              <Input placeholder="Project234@id" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Project Uid</Label>
              <Input placeholder="Project234@id.com" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Project Description</Label>
            <Textarea rows={5} placeholder="Project234@id.com" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <Label>Project Time</Label>
              <Input placeholder="Project234@id" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Project Date</Label>
              <Input placeholder="Project234@id.com" />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
