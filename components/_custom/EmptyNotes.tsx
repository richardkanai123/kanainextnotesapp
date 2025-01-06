'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"

// shown when there are no notes
const EmptyNotes = () => {

    return (
        <div className="w-full flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-semibold">No Notes Found</h1>
            <p className="text-sm text-gray-500">Add a note to get started</p>
            <Button variant='default' className='mt-4' asChild>
                <Link className="" href="/create">Add New Note</Link>
            </Button>
        </div>
    )
}

export default EmptyNotes