import NoteDetails from '@/components/_custom/NoteDetails'
import { DetailsSkeleton } from '@/components/_custom/skeletons/DetailsSkeleton'
import { getNotebyId, getUsers } from '@/lib/actions'
import React, { Suspense } from 'react'

const NotePage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params
    const { success, note } = await getNotebyId(id)
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
        <Suspense fallback={<DetailsSkeleton />} >
            <NoteDetails users={users} note={note} />
        </Suspense>
    )
}

export default NotePage