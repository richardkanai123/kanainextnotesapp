import SharedNoteComponent from "@/components/_custom/SharedNoteComponent"
import SharedNotesSkeleton from "@/components/_custom/skeletons/SharedNotesSkeleton"
import { GetSharedNotes } from "@/lib/actions"
import { Suspense } from "react"

const SharedNotesPage = async () => {

    const sharedNotesRes = await GetSharedNotes()
    const { success, message, notes } = sharedNotesRes

    if (!success) {
        return (
            <div className='flex-1 h-full flex items-center align-middle justify-center flex-col'>
                <p>{message}</p>
            </div>
        )
    }

    if (notes.length === 0) {
        return (
            <div className='flex-1 h-full flex items-center align-middle justify-center flex-col'>
                <p>No Shared Notes</p>
            </div>
        )
    }

    return (
        <div className='w-full p-2 mx-auto'>
            <p className="text-xl font-semibold mb-4">Shared Notes: {notes.length}</p>

            <div className='mx-auto w-full flex flex-col align-middle p-4 gap-2'>
                <Suspense fallback={<>{
                    Array.from({ length: 5 }).map((_, index) => (
                        <SharedNotesSkeleton key={index} />
                    ))
                }</>}>

                    {
                        notes.map((note) => (
                            <SharedNoteComponent note={note} key={note.id} />
                        ))
                    }
                </Suspense>
            </div>
        </div>
    )
}

export default SharedNotesPage