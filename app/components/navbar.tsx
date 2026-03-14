// app/components/navbar.tsx
import Link from 'next/link'
import { Search } from 'lucide-react'
import { auth } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ThemeToggle from './theme-toggle'

function getInitials(nameOrEmail: string) {
  const parts = nameOrEmail.split(' ').filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return nameOrEmail.slice(0, 2).toUpperCase()
}

export default async function Navbar() {
  const session = await auth()
  const nameOrEmail = session?.user?.name ?? session?.user?.email ?? 'Guest'
  const initials = getInitials(nameOrEmail)

  return (
    <nav className="bg-background shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Search className="h-8 w-8 text-primary" aria-hidden="true" />
              <span className="ml-2 text-lg font-semibold text-foreground">Person Search</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link href="/list" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              List
            </Link>
            <div className="hidden sm:flex items-center gap-2 rounded-md border px-2 py-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user?.image ?? undefined} alt={nameOrEmail} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="max-w-[180px] truncate text-sm text-foreground">{nameOrEmail}</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}