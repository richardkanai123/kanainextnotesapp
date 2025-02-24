import { NOTE_TYPE } from '@/lib/Types'
import SharedNoteComponent from './SharedNoteComponent'
const SharedNotesLister = ({ notes }: { notes: NOTE_TYPE[] | undefined }) => {

    if (!notes) {
        return (
            <div className='w-full flex flex-col align-middle p-4 gap-2'>
                <p>No notes shared with you yet.</p>
            </div>
        )
    }
    return (
        <div className='mx-auto w-full h-full flex flex-col align-middle p-4 gap-4'>
            {
                notes.map((note) => (
                    <SharedNoteComponent note={note} key={note.id} />
                ))
            }

        </div>
    )
}

export default SharedNotesLister