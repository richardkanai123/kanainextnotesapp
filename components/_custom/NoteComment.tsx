import { getUserImageById, getUserNameById } from '@/lib/actions'
import { COMMENT } from '@/lib/Types'
import DeleteCommentBtn from './Buttons/DeleteCommentBtn'
import { auth } from '@clerk/nextjs/server'
import { Suspense } from 'react'
import Image from 'next/image'
import { DaysFromToday } from '@/lib/utils'

const NoteComment = async ({ Comment }: { Comment: COMMENT }) => {
    const { userId } = await auth()
    const user = await getUserNameById(Comment.writer)
    const userImage = await getUserImageById(Comment.writer)
    const { content, createdAt, writer } = Comment

    if (!user) return null

    const isWriter = writer === userId


    return (
        <div className="mx-auto rounded-tl-xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm p-4 border flex justify-between items-center hover:shadow-md transition-all duration-200">
            <div className="w-full space-y-1">
                <p className="w-full text-base font-normal">{content}</p>
                <div className="w-full text-xs text-right flex items-center justify-end gap-2">
                    <div className="h-full flex align-middle justify-center items-center gap-2">
                        <Suspense fallback={<div className="w-full animate-pulse rounded bg-accent-foreground">... </div>}>
                            {userImage.success && userImage.image && (
                                <div className='w-6 h-6 object-cover rounded-full relative '>
                                    <Image src={userImage.image} alt={user.username || 'user avatar loading'} fill className="rounded-full" />
                                </div>
                            )}
                            {isWriter ? (
                                <p className="text-xs font-semibold text-primary">you</p>
                            ) : (
                                <p className="text-xs font-semibold">{user.username || 'unknown'}</p>
                            )}
                        </Suspense>
                    </div>
                    <span className="text-xs font-light opacity-75">
                        {DaysFromToday(new Date(createdAt))}
                    </span>
                </div>
            </div>
            {writer === userId && (
                <div className="ml-4">
                    <DeleteCommentBtn comment_id={Comment.id} userid={userId as string} />
                </div>
            )}
        </div>
    )
}

export default NoteComment