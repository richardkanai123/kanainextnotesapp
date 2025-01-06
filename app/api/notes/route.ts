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