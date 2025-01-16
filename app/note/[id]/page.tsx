import ErrorComponent from '@/components/_custom/ErrorCompponent'
import NoteDetails from '@/components/_custom/NoteDetails'
import { DetailsSkeleton } from '@/components/_custom/skeletons/DetailsSkeleton'
import { getNotebyId, getUsers } from '@/lib/actions'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { Params } from 'next/dist/server/request/params'
import React, { Suspense } from 'react'

const NotePage = async ({ params }: { params: Params }) => {
    const { id } = await params
    const { success, note } = await getNotebyId(id as string)
    const { success: usersResOk, users } = await getUsers()

    // const UserPermissions =  


    if (!success || !note || !usersResOk || !users) {
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
    return (
        <ErrorBoundary errorComponent={ErrorComponent} >
            <Suspense fallback={<DetailsSkeleton />} >
                <NoteDetails users={users} note={note} />
            </Suspense>
        </ErrorBoundary>
    )
}

export default NotePage