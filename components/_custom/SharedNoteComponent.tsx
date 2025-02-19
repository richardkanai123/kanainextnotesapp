import { getNoteAuthorNameById, getUserImageById } from "@/lib/actions"
import { NOTE_TYPE } from "@/lib/Types"
import SharedNoteLink from "./SharedNoteLink"
const SharedNoteComponent = async ({ note }: { note: NOTE_TYPE }) => {
    const { writer } = note
    const authorNameRes = await getNoteAuthorNameById(writer)
    const writerImage = await getUserImageById(writer)


    return (
        <SharedNoteLink imageurl={writerImage.success ? writerImage.image : null} username={authorNameRes.username} note={note} />
    )
}

export default SharedNoteComponent