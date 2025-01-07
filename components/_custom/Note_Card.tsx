"use client";
import { formatDistance } from "date-fns";
import { Card, CardContent } from "../ui/card";
import PinNoteBtn from "./PinNoteBtn";
import UnpinNoteBtn from "./UnPinNoteBtn";
import { NoteDialog } from "./NoteDialog";
import { NOTE_TYPE } from "@/lib/Types";
import { GetCategoryEmoji } from "@/lib/utils";
const DaysFromToday = (date: Date) => {
    const today = new Date();
    const formatedDistance = formatDistance(new Date(date), today, {
        addSuffix: true,
    });
    return formatedDistance;
};

const Note_Card = ({ Note }: { Note: NOTE_TYPE }) => {

    const NoteEmoji = GetCategoryEmoji(Note.category)
    const Note_Date = new Date(Note.createdAt)

    return (
        <Card className="w-full sm:min-w-80 max-w-[350px] min-h-[200px] py-3 px-2 aspect-video bg-yellow-100 rounded-md overflow-hidden relative flex-shrink-0 dark:bg-background ">
            <p className="text-xs font-light text-gray-400 ">
                {NoteEmoji} <span className="italic">{DaysFromToday(new Date(Note_Date))}</span>
            </p>

            <p className="text-2xl font-bold ">
                {Note.title}</p>
            <CardContent>
                <section
                    className="text-sm cardHtml p-2"
                    dangerouslySetInnerHTML={{ __html: Note.content }}></section>
            </CardContent>

            <div className="absolute top-0 right-0 p-1 flex align-middle items-center gap-4">
                <NoteDialog Note={Note} />
                {Note.isPinned ? (
                    <UnpinNoteBtn NoteID={Note.id} />
                ) : (
                    <PinNoteBtn NoteID={Note.id} />
                )}
            </div>
        </Card>
    );
};

export default Note_Card;
