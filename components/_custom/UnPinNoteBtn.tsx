'use client'
import { Button } from '../ui/button'
import { RiUnpinFill } from "react-icons/ri";

const UnpinNoteBtn = ({ NoteID }: { NoteID: string }) => {

    const UnPinNote = async () => {
        console.log('UnPinning note', NoteID)
    }

    return (
        <Button onClick={UnPinNote} variant='ghost' asChild className='p-2' >
            <RiUnpinFill className="w-10 h-10 text-primary" />
        </Button>
    )
}

export default UnpinNoteBtn