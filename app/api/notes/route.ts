// api route for notes

// get all notes

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const notes = await prisma.notes.findMany();
    if (notes.length > 0) {
        return NextResponse.json({
            success: true,
            notes,
            status:200
        });
    } else {
        return NextResponse.json({
            success: false,
            notes,
            status:200
        });
    }
}

// create a new note

export async function POST(req: Request) {
    const body = await req.json();
    
    try {
        const note = await prisma.notes.create({
            data: {
                title: body.title,
                content: body.content,
                writer: body.writer,
                date: body.date,
                category: body.category,
                isPinned: false,
                sharedWith: [],
            
            }
        });

        return NextResponse.json({
            success: true,
            note
        });
        
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                success: false,
                message: error.message
            });
        }
        return NextResponse.json({
            success: false,
            message: 'Error creating note'
        });
        
    }
    
}