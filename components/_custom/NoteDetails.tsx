'use client'
import { NOTE_TYPE, USERSTYPE } from "@/lib/Types"
import { GetCategoryEmoji, GrantPermissions } from "@/lib/utils";
import { Suspense, useMemo } from "react";
import NoteHeader from "./NoteHeader";
import NoteActions from "./NoteActions";
import ButtonsSkeleton from "./skeletons/ButtonsSkeleton";


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
            (users ?? []).filter((user) =>
                !recipientIDs.includes(user.externalId) &&
                user.externalId !== writer
            ),
        [users, recipientIDs, writer]
    )
    return (
        <div className='w-full max-w-screen-md mx-auto p-2 flex flex-col align-middle space-y-4'>

            <NoteHeader authorName={authorName as string} date={date} category={category} NoteCategoryEmoji={NoteCategoryEmoji as string} createdAt={createdAt} updatedAt={updatedAt} recipients={recipients} sharedWith={sharedWith} Permissions={Permissions} />
            <h1 className="text-2xl font-semibold my-2">{title}</h1>
            <section className="border-b py-2 px-4 list-inside" dangerouslySetInnerHTML={{ __html: content }}></section>
            <Suspense fallback={<ButtonsSkeleton />}>
                <NoteActions id={id} isPinned={isPinned} Permissions={Permissions} PossibleRecipients={PossibleRecipients} />
            </Suspense>
        </div>


    )
}

export default NoteDetails