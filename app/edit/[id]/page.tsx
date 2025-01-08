import EditNoteForm from '@/components/_custom/EditForm'
import { getNotebyId } from '@/lib/actions'
import React, { Suspense } from 'react'

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const note = await getNotebyId(id)
    if (note.success === false || !note.note) {
        return (
            <div className='w-full flex flex-col' >
                <h1 className="text-2xl font-semibold mb-2">Note Not Found</h1>
            </div>
        )
    }
    return (
        <div className='w-full flex flex-col' >
            <h1 className="text-2xl font-semibold mb-2">Editing Note</h1>
            <Suspense fallback={<p className="text-sm text-gray-500">Loading...</p>}>
                <EditNoteForm note={note.note} />
            </Suspense>
        </div>
    )
}

export default EditPage