"use client";
import { NOTE_TYPE } from "@/lib/Types";
import Link from "next/link";
import React, { useMemo } from "react";
import { SearchParams } from "next/dist/server/request/search-params";
import { filterNotes } from "@/lib/utils";
import { NoteDialog } from "./NoteDialog";

const UnPinnedNotesLister = ({
    Notes,
    SearchParams,
}: {
    Notes: NOTE_TYPE[];
    SearchParams: SearchParams;
}) => {
    const { title, category } = SearchParams;
    const FilteredNotesArray = useMemo(
        () => filterNotes(title, Notes, category),
        [title, Notes, category]
    );

    if (!Notes) {
        return (
            <div className="w-full flex flex-col items-center justify-center gap-4 py-2">
                <p className="text-sm text-gray-500">No Notes</p>
                <Link
                    href="/create"
                    className="text-sm font-semibold bg-lime-300 hover:bg-lime-400 text-sky-600 rounded-md shadow-sm  underline-offset-4 hover:underline p-3 ">
                    Create a Note
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center ">
            {FilteredNotesArray?.length === 0 || !FilteredNotesArray ? (
                <p className="text-primary">No Notes found.</p>
            ) : (
                FilteredNotesArray.map((note) => (
                    <NoteDialog Note={note} key={note.id} />
                ))
            )}
        </div>
    );
};

export default UnPinnedNotesLister;
