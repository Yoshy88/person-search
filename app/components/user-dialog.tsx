// app/components/user-dialog.tsx
'use client'

import { Plus } from 'lucide-react'
import {  addUser } from '@/app/actions/actions'
import { userFormSchema, User, UserFormData } from '@/app/actions/schemas'

import { UserForm } from './user-form'
import MutableDialog, { ActionState }  from '@/components/mutable-dialog'


export function UserDialog() {
  const handleAddUser = async (data: UserFormData): Promise<ActionState<User>> => {
    try {
      const newUser = await addUser(data)
      return {
        success: true,
        message: `User ${newUser.name} added successfully`,
        data: newUser
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add user ' + (error instanceof Error ? error.message : 'Unknown error')
      }
    }
  }

  return (
    <div className="flex justify-center my-6">
      <MutableDialog<UserFormData>
        formSchema={userFormSchema}
        FormComponent={UserForm}
        action={handleAddUser}
        triggerButtonLabel="Add User"
        triggerIcon={<Plus className="w-4 h-4" />}
        addDialogTitle="Add New User"
        dialogDescription="Fill out the form below to add a new user."
        submitButtonLabel="Save"
        defaultValues={{ name: '', email: '', phoneNumber: '' }} // Default empty values
      />
    </div>
  )
}