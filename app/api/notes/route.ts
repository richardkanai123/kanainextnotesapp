
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from '@clerk/nextjs/server'
export async function GET() {
try {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({
            success: false,
            notes: [],
            status: 200,
        });
    }

    const userNotes = await prisma.notes.findMany({
        where: {
            writer: userId,
        },
    });

    return NextResponse.json({
        success: true,
        notes: userNotes,
        status: 200,
    });
} catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({
            success: false,
            message: error.message,
            status: 500,
        });
    }
    return NextResponse.json({
        success: false,
        message: 'Error fetching notes',
        status: 500,
    });
}
}

// create a new note

// export async function POST(req: Request) {
//     const body = await req.json();

//     try {
//         const note = await prisma.notes.create({
//             data: {
//                 title: body.title,
//                 content: body.content,
//                 writer: body.writer,
//                 date: body.date,
//                 category: body.category,
//                 isPinned: false,
//                 sharedWith: [],
            
//             }
//         });

//         return NextResponse.json({
//             success: true,
//             note
//         });
        
//     } catch (error) {
//         if (error instanceof Error) {
//             return NextResponse.json({
//                 success: false,
//                 message: error.message
//             });
//         }
//         return NextResponse.json({
//             success: false,
//             message: 'Error creating note'
//         });
        
//     }
    
// }