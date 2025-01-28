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
import { EditIcon } from "lucide-react";
import { NOTE_TYPE } from "@/lib/Types";
import { useRouter } from "next/navigation";
import PinNoteBtn from "./Buttons/PinNoteBtn";
import { LuPanelBottomOpen } from "react-icons/lu";

import DeleleNoteBtn from "./Buttons/DeleleNoteBtn";
import NoteBadge from "./NoteBadge";

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
                <div className="w-full sm:min-w-80 max-w-[350px] min-h-[200px] py-3 px-2 aspect-video bg-yellow-200 rounded-md overflow-hidden relative flex-shrink-0 dark:bg-background animate-in transition-all ease-in border cursor-pointer hover:shadow-lg dark:hover:bg-slate-800 dark:hover:animate-pulse  ">
                    <p className="text-2xl font-bold ">{title}</p>
                    <div className="text-xs font-light text-gray-400 ">
                        <NoteBadge note_Category={Note.category} />
                        <span className="italic ml-2">
                            {DaysFromToday(new Date(date))}
                        </span>
                    </div>
                    <section
                        className="text-base p-4  text-wrap overflow-ellipsis"
                        dangerouslySetInnerHTML={{ __html: content }}>
                    </section>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-sm bg-yellow-300 dark:bg-background">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="w-full flex flex-col justify-between text-left gap-1">
                        <span className="text-sm">Dated: {readableDate}</span>
                        <span className="flex align-middle items-center text-base">{NoteCategoryEmoji}:{category} </span>
                        <span className="text-xs">Created: {formattedDate}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="p-2 noteDialog text-wrap" dangerouslySetInnerHTML={{ __html: content }} >
                </div>

                <DialogFooter className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 items-center content-center justify-center align-middle  ">

                    <Button onClick={() => Router.push(`/edit/${Note.id}`, {
                        scroll: true
                    })} variant='default' className="max-w-[200px]">
                        Edit Note
                        <EditIcon className="w-4 h-4" />
                    </Button>

                    <PinNoteBtn NoteID={Note.id} pinned={Note.isPinned} />

                    <Button onClick={() => Router.push(`/note/${Note.id}`)} variant='outline' className="max-w-[200px]">
                        Open Details
                        <LuPanelBottomOpen className="w-4 h-4" />
                    </Button>
                    <DeleleNoteBtn NoteID={Note.id} />
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
