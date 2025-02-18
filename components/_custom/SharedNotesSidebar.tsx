import React, { Suspense } from 'react'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import SharedNotesSkeleton from './skeletons/SharedNotesSkeleton'
import ErrorComponent from './ErrorCompponent'
import { GetSharedNotes } from '@/lib/actions'
import SideBarContent from './SideBarContent'
const SharedNotesSidebar = async () => {
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
        <ErrorBoundary errorComponent={ErrorComponent} >
            <Suspense fallback={<SharedNotesSkeleton />} >
                <SideBarContent notes={notes} />
            </Suspense >
        </ErrorBoundary >
    )
}

export default SharedNotesSidebar