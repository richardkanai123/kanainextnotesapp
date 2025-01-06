'use client'
import { Button } from '../ui/button'
import { TiPin } from "react-icons/ti";

const PinNoteBtn = ({ NoteID }: { NoteID: string }) => {

    const PinNote = async () => {
        console.log('Pinning note', NoteID)
    }

    return (
        <Button onClick={PinNote} variant='ghost' className='' >
            <TiPin className="w-12 h-12 text-primary" />
            <span className="sr-only">Pin</span>
        </Button>
    )
}

export default PinNoteBtn