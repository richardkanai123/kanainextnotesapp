'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from '@clerk/nextjs/server'

export const getNotes = async () => { 
const { userId } = await auth()

    if(!userId) {
        return {
            success: false,
            notes: []
        }
    }
    const notes = await prisma.notes.findMany(
        {
            orderBy:{
                createdAt: 'desc'
            },
            where: {
                writer: userId as string
            }
        }
    )
    if (notes.length > 0) {
        return {
            success: true,
            notes
        }
    } else {
        return {
            success: false,
            notes
        }
    }
}

export const getNotebyId = async (id: string) => {
    const note = await prisma.notes.findUnique({
        where: {
            id: id
        }, select: {
            id: true,
            title: true,
            content: true,
            writer: true,
            date: true,
            category: true,
            isPinned: true,
            createdAt: true,
            updatedAt: true,
            sharedWith:true
        }
    })
    
    if (!note) {
        return {
            success: false,
            note
        }
    }


    return {    
        success: true,
        note
    }
}

export const GetNoteByWriter = async (writer: string) => {
    const notes = await prisma.notes.findMany({
        where: {
            writer: writer
        }
    })

    if (notes.length > 0) { 
        return {
            success: true,
            notes
        }
    } else {
        return {
            success: false,
            notes
        }
    }
}    

export const createNote = async (newData: {
    title: string, content: string, writer: string, date:Date, category: string
}) => {
    const {
        title,
        content,
        writer,
        date,
        category

    }=newData
    const note = await prisma.notes.create({
        data: {
            category,
            title,
            content,
            writer,
            date,
            isPinned: false,
            sharedWith: [],
            updatedAt: new Date()
        }
    })

    return {
        success: true,
        note
    }
    
}

export const deleteNote = async (id: string) => {
const { userId } = await auth()

    try {
        const note = await prisma.notes.delete({
        where: {
            id: id
        }
    })
    if (!note) {
        return {
            success: false,
            message :   'Invalid Note'
        }
        }
        if(note.writer !== userId) {
            return {
                success: false,
                message :   'You are not authorized to delete this note'
            }
        }
        revalidatePath('/')
        return {
            success: true,
            message: 'Successfully Deleted'
        }
    
    } catch (error) {
        if(error instanceof Error) {
            return {
                success: false,
                message:error.message
            }
        }
        return {
            success: false,
            message: 'An error occurred! Please try again.'
        }
   }
}

export const UpdateNote = async (id: string, newData: {
    title: string, content: string, date:Date, category: string, isPinned: boolean
}) => {
    const {
        title,
        content,
        date,
        category,
        isPinned

    } = newData
    const { userId } = await auth()

    const note = await prisma.notes.findUnique({
        where: {
            id: id
        }
    })

    if (!note) {
        return {
            success: false,
            message :   'Invalid Note'
        }
    }

    if(note.writer !== userId) {
        return {
            success: false,
            message :   'You are not authorized to update this note'
        }
    }


    
    const UpdatedNote = await prisma.notes.update({
        where: {
            id: id
        },
        data: {
            title,
            content,
            date,
            category,
            isPinned
        }
    })

    if (!UpdatedNote) {
        return {
            success: false,
            message :   'Invalid Note'
        }
    }

    revalidatePath('/')
    return {
        success: true,
        message: 'Successfully Updated'
    }
}

export const PinNote = async (id: string) => {
    // get the note
    const note = await prisma.notes.findUnique({
        where: {
            id: id
        }
    })

    if (!note) {
        return {
            success: false,
            message :   'Invalid Note'
        }
    }
    
    if (note.isPinned) {
        return {
            success: false,
            message :   'Note is already pinned'
        }
    }

    const updatedNote = await prisma.notes.update({
        where: {
            id: id
        },
        data: {
            isPinned: true
        }
    })

    if (!updatedNote) {
        return {
            success: false,
            message :   'Failed to Pin Note'
        }
    }

    revalidatePath('/')
    return {
        success: true,
        message: 'Successfully Pinned Note'
    }
}

export const UnPinNote = async (id: string) => {
    // get the note
    const note = await prisma.notes.findUnique({
        where: {
            id: id
        }
    })

    if (!note) {
        return {
            success: false,
            message :   'Invalid Note'
        }
    }
    
    if (!note.isPinned) {
        return {
            success: false,
            message :   'Note is not pinned'
        }
    }

    const updatedNote = await prisma.notes.update({
        where: {
            id: id
        },
        data: {
            isPinned: false
        }
    })

    if (!updatedNote) {
        return {
            success: false,
            message :   'Failed to UnPin Note'
        }
    }

    revalidatePath('/')
    return {
        success: true,
        message: 'Successfully UnPinned Note'
    }
}

// sharing a note
// ! update the note's sharedWith array with the user's id gotten from clerk but stored in the database

export const ShareNote = async (noteId: string, recipientId: string, ) => { 
    // get the note
    const note = await prisma.notes.findUnique({
        where: {
            id: noteId
        }
    })

    // check if the note exists
    if (!note) {
        return {
            success: false,
            message :   'Invalid Note'
        }
    }

    // check if the recipient exists
    const recipient = await prisma.users.findUnique({
        where: {
            id: recipientId
        }
    })

    if (!recipient) {
        return {
            success: false,
            message :   'Invalid Recipient'
        }
    }

    const { userId } = await auth()

    // check if current user is the note's writer
    if (note.writer !== userId) {
        return {
            success: false,
            message :   'You are not authorized to share this note'
        }
    }
    
    // check if the note is already shared
    if (note.sharedWith.includes(recipientId)) {
        return {
            success: false,
            message :   'Note is already shared'
        }
    }

    // check if the recipient is the note's writer
    if (note.writer === recipientId) {
        return {
            success: false,
            message :   'You cannot share a note with yourself'
        }
    }

    const updatedNote = await prisma.notes.update({
        where: {
            id: noteId
        },
        data: {
            sharedWith: {
                push: recipientId
            }
        }
    })

    if (!updatedNote) {
        return {
            success: false,
            message :   'Failed to Share Note'
        }
    }

    revalidatePath('/')
    revalidatePath('/shared')
    return {
        success: true,
        message: 'Successfully Shared Note'
    }
}


// get notes shared with the user

export const GetSharedNotes = async () => {
    const { userId } = await auth()

    const notes = await prisma.notes.findMany({
        where: {
            sharedWith: {
                has: userId
            }
        }
    })

    if (!notes) {
        return {
            success: false,
            message: 'No notes shared with you',
            notes
        }
    }
    return {
        success: true,
        message: 'Successfully fetched shared notes',
        notes
    }

   }


//    get users
export const getUsers = async () => {
    try {
        const { userId } = await auth()
    if(!userId) {
        return {
            success: false,
            users: null,
            message: 'You are authenticated! Log in to continue'
        }
    }

    const users =await prisma.users.findMany({
        orderBy: {
            username: 'asc',
        }
    })

    if (!users) {
        return {
            success: false,
            message: 'No users found',
            users: null
        }
    }

    return {
        success: true,
        message: 'Successfully fetched users',
        users
    }
        
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
                users: null
            }
        }
        return {
            success: false,
            message: 'An error occurred! Please try again.',
            users: null
        }
        
    }
}

// get username by id
export const getUserNameById = async (id: string) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                externalId: id
            }
        })
        if (!user) {
            return {
                success: false,
                message: 'No user found',
                username: null
            }
        }
        return {
            success: true,
            message: 'Successfully fetched username',
            username: user.username
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
                username: null
            }
        }
        return {
            success: false,
            message: 'An error occurred! Please try again.',
            username: null
        }
    }
}