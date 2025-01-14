'use client'
import { NOTE_TYPE } from "@/lib/Types"
import { useMemo } from "react";

type USERTYPE = {

    createdAt: Date;
    updatedAt: Date;
    id: string;
    externalId: string;
    username: string;
    email_address: string;
}[] | null


const NoteDetails = ({ note, users }: { note: NOTE_TYPE, users: USERTYPE }) => {
    const { title, content, category, date, writer, createdAt, isPinned, updatedAt, sharedWith, id } = note

    const author = users?.map((user) => user).find((user) => user.externalId === writer)
    const authorName = author?.username

    const recipientIDs = sharedWith as Array<string>

    const recipients = useMemo(
        () =>
            recipientIDs.map((recipientID) => users?.find((user) => user.externalId === recipientID)),
        [users, recipientIDs]
    )


    return (
        <div className='w-full p-2 flex flex-col align-middle'>
            <h1 className="text-2xl font-semibold mb-2">{title}</h1>
            <section dangerouslySetInnerHTML={{ __html: content }}></section>
            <p className="text-sm text-gray-500">Dated: {new Date(date).toDateString()}</p>
            <p className="text-sm text-gray-500">Created At: {new Date(createdAt).toDateString()}</p>
            <p className="text-sm text-gray-500">Updated At: {new Date(updatedAt).toDateString()}</p>
            <p className="text-sm text-gray-500">Category: {category}</p>
            <p className="text-sm text-gray-500">Writer: {authorName}</p>
            <p className="text-sm text-gray-500">Pinned: {isPinned ? 'Yes' : 'No'}</p>
            <p className="text-sm text-gray-500">Shared With: {
                recipients?.map((recipient) => recipient?.username).join(', ')
            }</p>

            <p>{id}</p>
        </div>
    )
}

export default NoteDetails