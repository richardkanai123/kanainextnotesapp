
import { getNoteAuthorNameById } from "@/lib/actions"
import { NOTE_TYPE } from "@/lib/Types"
import { GetCategoryEmoji } from "@/lib/utils"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "../ui/badge"

const SharedNoteComponent = async ({ note }: { note: NOTE_TYPE }) => {
    const { category, id, writer, title, createdAt } = note
    const authorNameRes = await getNoteAuthorNameById(writer)

    const categoryEmoji = GetCategoryEmoji(category)
    const CreatedAt = new Date(createdAt).toLocaleDateString()

    return (
        <Link href={`/note/${id}`}>
            <div className="p-2 w-full max-w-[500px] px-2 py-3 flex align-middle items-center gap-4 text-center rounded-lg cursor-pointer border-b shadow-sm hover:shadow-md transition-all ease-in delay-100 bg-accent hover:bg-transparent ">
                <div className="flex gap-4 align-middle items-center border-r px-1">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>{authorNameRes.success && authorNameRes.username || "Unknown"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col align-middle items-start text-left">
                        <p className="text-lg font-medium">{authorNameRes.success && authorNameRes.username || "Unknown"}</p>
                        <p className="text-xs font-light">{CreatedAt}</p>
                    </div>
                </div>
                <p className="flex align-middle items-center text-lg">{title} </p>
                <Badge variant='default' className="text-lg rounded-full">{categoryEmoji}</Badge>
            </div>
        </Link>
    )
}

export default SharedNoteComponent