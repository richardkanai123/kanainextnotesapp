import React from 'react'
import { NOTE_TYPE } from '@/lib/Types'
const SharedNotesComponent = ({ notes }: { notes: NOTE_TYPE[] }) => {

    return (
        <div className='w-full p-2'>
            {
                notes.map((note) => (
                    <div className='w-full p-2 hover:bg-accent' key={note.id}>{note.title}</div>
                ))
            }
        </div>
    )
}

export default SharedNotesComponent