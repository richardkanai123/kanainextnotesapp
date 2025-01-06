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
import { DaysFromToday } from "@/lib/utils"
import { EditIcon, Trash2Icon } from "lucide-react";
import { BsSendArrowUpFill } from "react-icons/bs";
interface NoteDialogProps {
    id: string;
    title: string;
    date: Date;
    content: string;
    writer: string;
    time_created?: string;
    time_updated?: string;
    isPinned: boolean;
}

export function NoteDialog({ Note }: {
    Note: NoteDialogProps

}) {
    const {
        title,
        content,
        date,
    } = Note

    const formattedDate = DaysFromToday(date)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-sm">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {formattedDate}
                    </DialogDescription>
                </DialogHeader>
                <div className="p-2 noteDialog" dangerouslySetInnerHTML={{ __html: content }} >
                </div>

                <DialogFooter className="w-full px-2 flex flex-col gap-2 justify-center md:flex-row">
                    <Button variant='default'>
                        Edit Note
                        <EditIcon className="w-4 h-4 mr-2" />
                    </Button>

                    <Button variant='outline'>
                        Share Note
                        <BsSendArrowUpFill className="w-4 h-4 mr-2" />
                    </Button>

                    <Button variant='destructive'>
                        Delete Note
                        <Trash2Icon className="w-4 h-4 mr-2" />
                    </Button>

                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
