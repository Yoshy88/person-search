'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'
import { updateUser } from '@/app/actions/actions'
import { userFormSchema, User, UserFormData } from '@/app/actions/schemas'
import { UserForm } from './user-form'
import MutableDialog, { ActionState } from '@/components/mutable-dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface UserEditDialogProps {
  user: User
  iconOnly?: boolean
}

export function UserEditDialog({ user, iconOnly = false }: UserEditDialogProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [pendingData, setPendingData] = useState<UserFormData | null>(null)
  const router = useRouter()

  const handleConfirmSave = async (): Promise<ActionState<User>> => {
    if (!pendingData) {
      return {
        success: false,
        message: 'No data to save',
      }
    }

    try {
      const updatedUser = await updateUser({
        id: user.id,
        ...pendingData,
      })
      return {
        success: true,
        message: `User ${updatedUser.name} updated successfully`,
        data: updatedUser,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update user' + (error instanceof Error ? error.message : String(error)),
      }
    }
  }

  const handleEditUser = async (data: UserFormData): Promise<ActionState<User>> => {
    setPendingData(data)
    setShowConfirmation(true)
    // Return a pending state - the actual save will happen after confirmation
    return {
      success: true,
      message: 'Pending confirmation',
    }
  }

  return (
    <>
      <MutableDialog<UserFormData>
        formSchema={userFormSchema}
        FormComponent={UserForm}
        action={handleEditUser}
        triggerButtonLabel="Edit"
        triggerIcon={<Pencil className="w-4 h-4" />}
        triggerButtonVariant="ghost"
        triggerButtonSize={iconOnly ? 'icon' : 'default'}
        triggerButtonClassName={iconOnly ? 'hover:bg-accent' : undefined}
        triggerAriaLabel={`Edit ${user.name}`}
        hideTriggerLabel={iconOnly}
        editDialogTitle={`Edit ${user.name}`}
        dialogDescription={`Update the details of ${user.name} below.`}
        submitButtonLabel="Save Changes"
        defaultValues={{
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
        }}
      />

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Changes</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to save the changes to {user.name}'s profile?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const result = await handleConfirmSave()
                if (result.success) {
                  setShowConfirmation(false)
                  setPendingData(null)
                  router.refresh()
                }
              }}
            >
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
