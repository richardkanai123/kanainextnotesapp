'use client'
import { formatDistance } from "date-fns";
import { Card, CardContent } from "../ui/card";
import PinNoteBtn from "./PinNoteBtn";
import UnpinNoteBtn from "./UnPinNoteBtn";
interface NoteProps {
    id: string;
    title: string;
    date: string;
    content: string;
    creatorId: string;
    time_created: string;
    time_updated: string;
    pinned: boolean;
}

const DaysFromToday = (date: string) => {
    const formatedDistance = formatDistance(new Date(date), new Date(), { addSuffix: true })
    return formatedDistance
}

const Note_Card = ({ Note }: { Note: NoteProps }) => {
    return (
        <Card className="w-full sm:min-w-80 max-w-[350px] py-3 px-2 aspect-video bg-yellow-200 rounded-md overflow-hidden relative flex-shrink-0 ">
            <p className="text-sm italic text-gray-500">{DaysFromToday(Note.date)}</p>
            {Note.pinned ?
                <UnpinNoteBtn NoteID={Note.id} />
                :
                <PinNoteBtn NoteID={Note.id} />
            }
            <p className="text-lg font-medium">{Note.title}</p>
            <CardContent>
                <section className="text-sm cardHtml" dangerouslySetInnerHTML={
                    { __html: Note.content }
                } ></section>
            </CardContent>

        </Card>
    )
}

export default Note_Card