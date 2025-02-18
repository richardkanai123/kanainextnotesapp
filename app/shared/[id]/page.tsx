import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { Params } from 'next/dist/server/request/params'
import React, { Suspense } from 'react'
import CommentSection from '@/components/_custom/CommentSection'
import CommentSectionError from '@/components/_custom/CommentSectionError'
import ErrorComponent from '@/components/_custom/ErrorCompponent'
import NoteDetails from '@/components/_custom/NoteDetails'
import { DetailsSkeleton } from '@/components/_custom/skeletons/DetailsSkeleton'
import { getNotebyId, getUserNameById, getUsers } from '@/lib/actions'
import CommentsSkeleton from '@/components/_custom/skeletons/CommentsSkeleton'
import CreateComment from '@/components/_custom/CreateComment'


const NotePage = async ({ params }: { params: Params }) => {
    const { id } = await params
    const { success, note } = await getNotebyId(id as string)
    const { success: usersResOk, users } = await getUsers()


    if (!success || !note) {
        return (
            <div className='w-full flex flex-col text-red-500' >
                <h1 className="text-2xl font-semibold mb-2 ">Note Not Found</h1>
                {
                    (!usersResOk || !users) && <p className="text-sm text-red-200">
                        Unable to fetch users!
                    </p>

                }
            </div>
        )
    }

    const author = await getUserNameById(note.writer)
    return (
        <>
            <ErrorBoundary errorComponent={ErrorComponent} >
                <Suspense fallback={<DetailsSkeleton />} >
                    <NoteDetails author={author.success ? author.username as string : 'unknown'} users={users} note={note} />
                </Suspense>
            </ErrorBoundary>

            <ErrorBoundary errorComponent={CommentSectionError}>
                <Suspense fallback={<CommentsSkeleton />} >
                    <CommentSection note_id={note.id} />
                    <CreateComment note={note.id} />
                </Suspense>
            </ErrorBoundary>
        </>

    )
}

export default NotePage