import React from 'react'
import { NOTE_TYPE } from '@/lib/Types'
import Link from 'next/link'
const SharedNotesComponent = ({ notes }: { notes: NOTE_TYPE[] }) => {

    return (
        <div className='w-full flex flex-col p-2'>
            {
                notes.map((note) => (
                    <Link href={`/note/${note.id}`} className='w-full p-2 hover:bg-accent' key={note.id}>{note.title}</Link>
                ))
            }

        </div>
    )
}

export default SharedNotesComponent