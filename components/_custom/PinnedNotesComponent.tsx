'use client'
import { NOTE_TYPE } from "@/lib/Types"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { NoteDialog } from "@/components/_custom/NoteDialog"



const PinnedNotesComponent = ({ notes }: { notes: NOTE_TYPE[] }) => {
    return (
        <ScrollArea
            dir="ltr"
            className="w-full whitespace-nowrap rounded-md border-b mb-4 pb-4">
            <div className="flex w-max space-x-2">
                {notes.map((note) => (
                    <NoteDialog Note={note} key={note.id} />
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

export default PinnedNotesComponent