"use client";
import { formatDistance } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import UnpinNoteBtn from "./Buttons/UnPinNoteBtn";
import { NoteDialog } from "./NoteDialog";
import { NOTE_TYPE } from "@/lib/Types";
import NoteBadge from "./NoteBadge";
const DaysFromToday = (date: Date) => {
    const today = new Date();
    const formatedDistance = formatDistance(new Date(date), today, {
        addSuffix: true,
    });
    return formatedDistance;
};

const Note_Card = ({ Note }: { Note: NOTE_TYPE }) => {
    const Note_Date = new Date(Note.createdAt)


    return (
        <Card className="w-full sm:min-w-80 max-w-[350px] min-h-[200px] py-3 px-2 aspect-video bg-yellow-100 rounded-md overflow-hidden relative flex-shrink-0 dark:bg-background ">
            <p className="text-xs font-light text-gray-400 ">
                <NoteBadge note_Category={Note.category} />
                <span className="italic ml-2">{DaysFromToday(new Date(Note_Date))}</span>
            </p>

            <p className="text-2xl font-bold ">
                {Note.title}</p>
            <CardContent>
                <section
                    className="text-sm cardHtml p-2"
                    dangerouslySetInnerHTML={{ __html: Note.content }}></section>
            </CardContent>

            <div className="absolute top-0 right-0  flex align-middle items-center gap-2">
                <NoteDialog Note={Note} />
                {Note.isPinned &&
                    <UnpinNoteBtn NoteID={Note.id} />
                }
            </div>
        </Card>
    );
};

export default Note_Card;
