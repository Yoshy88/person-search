import { getAllUsers } from '@/app/actions/actions'
import { UserDialog } from '@/app/components/user-dialog'
import UsersTable from './users-table'

export const dynamic = 'force-dynamic'

export default async function ListPage() {
  const users = await getAllUsers()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Registered Users</h1>
        <UserDialog />
      </div>

      <UsersTable users={users} />
    </div>
  )
}
