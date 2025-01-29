import { getUserNameById } from '@/lib/actions'
import { COMMENT } from '@/lib/Types'
import DeleteCommentBtn from './Buttons/DeleteCommentBtn'
import { auth } from '@clerk/nextjs/server'
import { Suspense } from 'react'

const NoteComment = async ({ Comment }: { Comment: COMMENT }) => {
    const { userId } = await auth()
    const user = await getUserNameById(Comment.writer)

    const { content, createdAt, writer } = Comment

    if (!user) return null

    return (
        <Suspense fallback={<div className="w-full animate-pulse rounded bg-accent-foreground"> Loading ... </div>}>
            <div className="mx-auto rounded p-2 bg-accent flex justify-between items-center">
                <div className="w-full">
                    <p className="text-base font-normal items-center">{content}</p>
                    <div className="w-full px-1 text-xs text-right items-end">
                        by: <span className="font-semibold">{user?.username}</span> on <span className="text-xs font-light">{new Date(createdAt).toLocaleDateString().slice(0, 5)},{new Date(createdAt).toLocaleTimeString()}</span>
                    </div>

                </div>
                {
                    writer === userId && <DeleteCommentBtn comment_id={Comment.id} userid={userId as string} />
                }
            </div>
        </Suspense>
    )
}

export default NoteComment