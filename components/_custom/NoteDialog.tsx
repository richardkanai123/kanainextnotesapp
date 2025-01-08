'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DaysFromToday, FormatDateIntoReadableString, GetCategoryEmoji } from "@/lib/utils"
import { EditIcon, Trash2Icon } from "lucide-react";
import { BsSendArrowUpFill } from "react-icons/bs";
import { NOTE_TYPE } from "@/lib/Types";
import { useRouter } from "next/navigation";
import PinNoteBtn from "./Buttons/PinNoteBtn";

export function NoteDialog({ Note }: {
    Note: NOTE_TYPE

}) {
    const {
        title,
        content,
        createdAt,
        category,
        date
    } = Note

    const formattedDate = DaysFromToday(createdAt)

    const NoteCategoryEmoji = GetCategoryEmoji(category)

    const readableDate = FormatDateIntoReadableString(date)

    const Router = useRouter()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-sm bg-yellow-300 dark:bg-background">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="w-full flex flex-col justify-between text-left gap-1">
                        <span>Dated: {readableDate}</span>
                        <span>{NoteCategoryEmoji}:{category} </span>
                        <span className="text-xs">Created: {formattedDate}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="p-2 noteDialog" dangerouslySetInnerHTML={{ __html: content }} >
                </div>

                <DialogFooter className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 items-center content-center justify-center align-middle  ">

                    <Button onClick={() => Router.push(`/edit/${Note.id}`, {
                        scroll: true
                    })} variant='default' className="max-w-[200px]">
                        Edit Note
                        <EditIcon className="w-4 h-4" />
                    </Button>

                    <PinNoteBtn NoteID={Note.id} pinned={Note.isPinned} />

                    <Button variant='outline' className="max-w-[200px]">
                        Share Note
                        <BsSendArrowUpFill className="w-4 h-4" />
                    </Button>
                    <Button variant='destructive' className="max-w-[200px]">
                        Delete Note
                        <Trash2Icon className="w-4 h-4" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
