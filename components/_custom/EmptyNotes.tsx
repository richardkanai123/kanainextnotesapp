'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"

// shown when there are no notes
const EmptyNotes = () => {

    return (
        <div className="w-full mx-auto flex flex-col items-center justify-center min-h-fit p-2 text-center 
         bg-accent">
            <div className="mb-2">
                <svg
                    className="w-24 h-24 mx-auto text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-3.5-3.5A2 2 0 0012.086 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2M9 8h4"
                    />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-secondary-foreground">Your Notes Are Empty</h1>
            <p className="text-gray-500 mb-8 max-w-md">Start capturing your thoughts and ideas by creating a note</p>
            <Button size="lg" className="font-semibold" asChild>
                <Link href="/create">
                    <span className="flex items-center gap-2">
                        Create a Note
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </span>
                </Link>
            </Button>
        </div>
    )
}

export default EmptyNotes