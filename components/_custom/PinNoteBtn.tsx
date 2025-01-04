'use client'
import { Button } from '../ui/button'
import { MdBookmarkAdded } from 'react-icons/md'

const PinNoteBtn = ({ NoteID }: { NoteID: string }) => {

    const PinNote = async () => {
        console.log('Pinning note', NoteID)
    }

    return (
        <Button onClick={PinNote} variant='ghost' asChild className="absolute top-0 right-0 p-0">
            <MdBookmarkAdded className="w-6 h-6 text-primary" />
        </Button>
    )
}

export default PinNoteBtn