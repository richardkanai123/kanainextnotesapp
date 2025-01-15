'use client'
import { NOTE_TYPE } from "@/lib/Types"
import { GetCategoryEmoji, GrantPermissions } from "@/lib/utils";
import { useMemo } from "react";
import PinNoteBtn from "./Buttons/detailsPageButtons/PinNoteBtn";
import DeleteNoteBtn from "./Buttons/detailsPageButtons/DeleteBtn";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { EditIcon } from "lucide-react";
import ShareNoteBtn from "./Buttons/detailsPageButtons/ShareNoteBtn";

type USERSTYPE = {

    createdAt: Date;
    updatedAt: Date;
    id: string;
    externalId: string;
    username: string;
    email_address: string;
}[] | null


const NoteDetails = (props: { note: NOTE_TYPE, users: USERSTYPE }) => {
    const { note, users } = props;
    const { title, content, category, date, writer, createdAt, isPinned, updatedAt, sharedWith, id } = note
    const author = users?.find((user) => user.externalId === writer)
    const authorName = author?.username
    const recipientIDs = sharedWith as Array<string>
    const recipients = useMemo(
        () =>
            users?.filter((user) => recipientIDs.includes(user.externalId)).map((user) => user),
        [users, recipientIDs]
    )
    const NoteCategoryEmoji = GetCategoryEmoji(category)

    const Permissions = GrantPermissions(writer, recipientIDs)
    const PossibleRecipients = useMemo(
        () =>
            users?.filter((user) =>
                !recipientIDs.includes(user.externalId) &&
                user.externalId !== writer
            ),
        [users, recipientIDs, writer]
    )

    const getSharedWithText = () => {
        return recipients?.map((recipient) => recipient?.username).join(',') || "not shared yet";
    }


    const Router = useRouter()

    return (
        <div className='w-full max-w-screen-md mx-auto p-2 flex flex-col align-middle space-y-4 '>
            <div className="w-full flex flex-col text-sm text-gray-500 text-left">
                <p className="">Note by: {authorName}</p>
                <p className="">Dated: {new Date(date).toDateString()}</p>
                <p className="">{NoteCategoryEmoji}:{category}</p>
            </div>
            <h1 className="text-2xl font-semibold my-2">{title}</h1>
            <section className="border-b py-2 px-4 list-inside" dangerouslySetInnerHTML={{ __html: content }}></section>
            <div className="w-full p-4 flex gap-4 flex-wrap text-gray-600 dark:text-gray-200 text-sm" >
                <p className="">Created on: {`${new Date(createdAt).toLocaleDateString()}:${new Date(createdAt).toLocaleTimeString()}`}</p>
                <p className="">Last Update:{`${new Date(updatedAt).toLocaleDateString()}:${new Date(updatedAt).toLocaleTimeString()}`}</p>
                {
                    Permissions?.canEdit && <p className="italic">Shared With: {getSharedWithText()}</p>
                }
            </div>
            {/* actions */}
            <div className="w-full md:max-w-screen-sm my-4 flex align-middle justify-center items-center flex-wrap gap-4">
                {
                    Permissions?.canPin && <PinNoteBtn NoteID={id} pinned={isPinned} />
                }
                {
                    Permissions?.canEdit && <Button onClick={() => Router.push(`/edit/${id}?scroll=true`)} variant='outline' size='icon'>
                        <EditIcon className="w-4 h-4" />
                    </Button>
                }

                {
                    Permissions?.canShare && <ShareNoteBtn users={PossibleRecipients} noteid={id} />
                }

                {
                    Permissions?.canDelete && <DeleteNoteBtn NoteID={id} />
                }
            </div>

        </div>
    )
}

export default NoteDetails