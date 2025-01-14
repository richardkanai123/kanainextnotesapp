import ErrorComponent from '@/components/_custom/ErrorCompponent'
import SharedNotesComponent from '@/components/_custom/SharedNotesComponent'
import { GetSharedNotes } from '@/lib/actions'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import React, { Suspense } from 'react'

const SharedNotesPage = async () => {
    const sharedNotesRes = await GetSharedNotes()
    const { success, message, notes } = sharedNotesRes
    if (!success) {
        return (
            <div className='flex items-center align-middle justify-center flex-col min-h-[70vh]'>
                <h1>Shared Notes</h1>
                <p>{message}</p>
            </div>
        )
    }

    if (notes.length === 0) {
        return (
            <div className='flex items-center align-middle justify-center flex-col min-h-[70vh]'>
                <h1>Shared Notes</h1>
                <p>No notes shared with you yet.</p>
            </div>
        )
    }
    return (
        <div className='flex items-center align-middle justify-center flex-col min-h-[70vh]'>
            <h1>Shared Notes</h1>
            <ErrorBoundary errorComponent={ErrorComponent} >
                <Suspense fallback={<p className="text-sm text-gray-500">Loading...</p>} >
                    <SharedNotesComponent notes={notes} />
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}

export default SharedNotesPage