import { getNoteAuthorNameById } from "@/lib/actions"
import { NOTE_TYPE } from "@/lib/Types"
import SharedNoteLink from "./SharedNoteLink"
const SharedNoteComponent = async ({ note }: { note: NOTE_TYPE }) => {
    const { writer } = note
    const authorNameRes = await getNoteAuthorNameById(writer)


    return (
        <SharedNoteLink authorNameRes={authorNameRes} note={note} />
    )
}

export default SharedNoteComponent