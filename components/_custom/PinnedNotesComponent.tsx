'use client'
import { NOTE_TYPE } from "@/lib/Types"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import Note_Card from "./Note_Card"

const PinnedNotesComponent = ({ notes }: { notes: NOTE_TYPE[] }) => {
    return (
        <ScrollArea
            dir="ltr"
            className="w-full whitespace-nowrap rounded-md border-b mb-4 pb-4">
            <div className="flex w-max space-x-2">
                {notes.map((note) => (
                    <Note_Card
                        key={note.id}
                        Note={note}
                    />
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

export default PinnedNotesComponent