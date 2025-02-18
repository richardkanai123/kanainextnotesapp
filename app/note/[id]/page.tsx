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
import { auth } from '@clerk/nextjs/server'


const NotePage = async ({ params }: { params: Params }) => {
    const { id } = await params
    const { userId, redirectToSignIn } = await auth()
    const { success, note } = await getNotebyId(id as string)

    if (!userId) return redirectToSignIn()

    if (!note || !success) {
        return (
            <div className='w-full flex flex-col text-red-500 p-4 align-middle justify-center flex-1' >
                <h1 className="text-2xl font-semibold mb-2 ">Note Not Found</h1>
            </div>
        )
    }

    const CurrentUsers = await getUsers()
    const GetNoteAuthor = await getUserNameById(note.writer)



    return (
        <>
            <ErrorBoundary errorComponent={ErrorComponent} >
                <Suspense fallback={<DetailsSkeleton />} >
                    <NoteDetails author={GetNoteAuthor.success ? GetNoteAuthor.username as string : 'unknown'} users={CurrentUsers.success ? CurrentUsers.users : []} note={note} />
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