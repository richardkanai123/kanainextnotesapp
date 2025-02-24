"use client";
import { NOTE_TYPE } from "@/lib/Types";
import React, { useMemo } from "react";
import { filterNotes } from "@/lib/utils";
import { NoteDialog } from "./NoteDialog";
import { useSearchParams } from "next/navigation";
import EmptyNotes from "./EmptyNotes";

const UnPinnedNotesLister = ({
    Notes,
}: {
    Notes: NOTE_TYPE[];
}) => {

    const searchParams = useSearchParams()
    const title = searchParams.get('title') as string
    const category = searchParams.get('category') as string
    const FilteredNotesArray = useMemo(
        () => filterNotes(title, Notes, category),
        [title, Notes, category]
    );

    if (!Notes) {
        return (
            <EmptyNotes />
        );
    }


    if ((FilteredNotesArray?.length === 0 || !FilteredNotesArray) && title) {
        return (
            <div className="w-full flex justify-center items-center space-x-4">
                <div className="w-24 h-24">
                    <svg
                        className="w-full h-full text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">No results found</h2>
                    <p className="text-sm text-gray-500">
                        Try searching for something else
                    </p>
                </div>
            </div>
        )
    }


    return (

        <div className="w-full lg:max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center ">
            {FilteredNotesArray.map((note) => (
                <NoteDialog Note={note} key={note.id} />
            ))
            }
        </div>
    )


};

export default UnPinnedNotesLister;
