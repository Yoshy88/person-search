//app/actions/actions.ts

'use server'

import { revalidatePath } from 'next/cache'
import { User, userIdSchema, userListSchema, userSchema } from './schemas'
import { signIn, signOut } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function searchUsers(query: string): Promise<User[]> {
    console.log('Searching users with query:', query)
    const trimmedQuery = query.trim()
    if (!trimmedQuery) {
        return []
    }

    const results = await prisma.user.findMany({
        where: {
            name: {
                startsWith: trimmedQuery,
            },
        },
        orderBy: {
            name: 'asc',
        },
    })
    console.log('Search results:', results)
    return userListSchema.parse(results)
}

export async function addUser(data: Omit<User, 'id'>): Promise<User> {
    const newId = crypto.randomUUID();
    const validatedFormData = userSchema.omit({ id: true }).parse(data)
    const newUser = { ...validatedFormData, id: newId }
    const validatedUser = userSchema.parse(newUser)
    const createdUser = await prisma.user.create({ data: validatedUser })
    revalidatePath('/list')
    revalidatePath('/')
    return userSchema.parse(createdUser)
}

export async function deleteUser(id: string): Promise<void> {
    const validatedId = userIdSchema.parse(id)
    const existingUser = await prisma.user.findUnique({ where: { id: validatedId } })
    if (!existingUser) {
        throw new Error(`User with id ${validatedId} not found`)
    }
    await prisma.user.delete({ where: { id: validatedId } })
    console.log(`User with id ${validatedId} has been deleted.`)
    revalidatePath('/') // Revalidate the page or component path
    revalidatePath('/list')

}

export async function updateUser(user: User): Promise<User> {
    const validatedUser = userSchema.parse(user)
    const existingUser = await prisma.user.findUnique({ where: { id: validatedUser.id } })
    if (!existingUser) {
        throw new Error(`User with id ${validatedUser.id} not found`)
    }

    const updatedUser = await prisma.user.update({
        where: { id: validatedUser.id },
        data: {
            name: validatedUser.name,
            email: validatedUser.email,
            phoneNumber: validatedUser.phoneNumber,
        },
    })
    console.log(`User with id ${validatedUser.id} has been updated.`)
    revalidatePath('/') // Revalidate the page or component path
    revalidatePath('/list')

    return userSchema.parse(updatedUser)
}

export async function getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
        orderBy: { name: 'asc' },
    })
    return userListSchema.parse(users)
}

export async function getUserById(id: string): Promise<User | null> {
    const validatedId = userIdSchema.parse(id)
    const user = await prisma.user.findUnique({ where: { id: validatedId } })
    return user ? userSchema.parse(user) : null
}

export async function signInWithGoogle() {
    await signIn('google')
}

export async function signOutUser() {
    await signOut({ redirectTo: '/' })
}
