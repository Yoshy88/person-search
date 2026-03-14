'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Trash } from 'lucide-react'
import { deleteUser } from '@/app/actions/actions'
import { toast } from "@/hooks/use-toast"
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

export default function DeleteButton({ userId, iconOnly = false }: { userId: string; iconOnly?: boolean }) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      console.log('DeleteButton: Attempting to delete user with ID', userId)
      await deleteUser(userId)
      toast({
        title: "User Deleted",
        description: `A user with the ID ${userId} has been deleted.`,
        variant: "default",
      })
      setShowConfirmation(false)
      router.refresh()
    } catch (error) {
      console.error('DeleteButton: Error deleting user', error)
      toast({
        title: "Error",
        description: "An error occurred while deleting the user.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Button
        onClick={() => setShowConfirmation(true)}
        variant={iconOnly ? 'ghost' : 'destructive'}
        size={iconOnly ? 'icon' : 'default'}
        className={iconOnly ? 'text-destructive hover:bg-destructive/10 hover:text-destructive' : undefined}
        aria-label="Delete user"
      >
        <Trash className={iconOnly ? 'w-4 h-4' : 'w-4 h-4 mr-2'} />
        {!iconOnly && 'Delete'}
      </Button>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
