import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const getNotes = async () => {
    const notes = await prisma.note.findMany()
    return notes
}

export const getNotebyId = async (id: string) => {
    const note = await prisma.note.findUnique({
        where: {
            id: id
        }
    })
    return note
}

export const GetNoteByWriter = async (writer: string) => {
    const notes = await prisma.note.findMany({
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
