'use client'
import { Button } from '../ui/button'
import { MdBookmarkRemove } from 'react-icons/md'

const UnpinNoteBtn = ({ NoteID }: { NoteID: string }) => {

    const UnPinNote = async () => {
        console.log('UnPinning note', NoteID)
    }

    return (
        <Button onClick={UnPinNote} variant='ghost' asChild className="absolute top-0 right-0 p-0">
            <MdBookmarkRemove className="w-6 h-6 text-primary" />
        </Button>
    )
}

export default UnpinNoteBtn