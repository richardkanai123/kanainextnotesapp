'use server'
import { prisma } from "@/lib/prisma"

export const getNotes = async () => { 
    const notes = await prisma.notes.findMany()
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
    title: string, content: string, writer: string, date:Date
}) => {
    const {
        title,
        content,
        writer,
        date
    }=newData
    const note = await prisma.notes.create({
        data: {
            title,
            content,
            writer,
            date,
            isPinned: false
        }
    })

    if (!note) {
        return {
            success: true,
            note
        }
    }
    return {
        success: true,
        note
    }
    
}