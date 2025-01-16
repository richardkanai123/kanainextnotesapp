import { NOTE_TYPE } from '@/lib/Types'
import SharedNoteComponent from './SharedNoteComponent'
const SharedNotesLister = ({ notes }: { notes: NOTE_TYPE[] }) => {

    return (
        <div className='w-full flex flex-col align-middle p-4 gap-2'>
            {
                notes.map((note) => (
                    <SharedNoteComponent note={note} key={note.id} />
                ))
            }

        </div>
    )
}

export default SharedNotesLister