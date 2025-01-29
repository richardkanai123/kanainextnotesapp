
import { GetComments } from "@/lib/actions"
import { COMMENT } from "@/lib/Types"
import NoteComment from "./NoteComment"
// Lists all existing comments for a note and allows users to add new comments
const CommentSection = async ({ note_id }: { note_id: string }) => {
    const Comments = await GetComments(note_id)
    const { comments, message, success } = Comments

    if (!success) {
        return (
            <div className="w-full animate-pulse rounded">
                <p className="text-sm text-gray-400">{message}</p>
            </div>
        )
    }

    if (success && (!comments || comments.length === 0)) {
        return (
            <div className="w-full  rounded mx-auto px-4 text-center mt-4 ">
                <p className="text-sm text-yellow-400">No comments yet</p>
            </div>
        )
    }

    return (
        <div className="w-full md:w-2/3 mx-auto px-4 mt-4  ">
            <h1 className="text-secondary font-semibold mb-2 text-left">Comments</h1>
            <div className="w-full mx-auto space-y-2">
                {comments?.map((comment: COMMENT) => (
                    <NoteComment key={comment.id} Comment={comment} />
                ))}
            </div>
        </div>
    )

}

export default CommentSection