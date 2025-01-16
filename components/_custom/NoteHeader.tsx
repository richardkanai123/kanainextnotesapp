import { PERMISSIONSTYPE } from "@/lib/Types";
import NoteMeta from "./NoteDetailsBody";
import { JsonValue } from "@prisma/client/runtime/library";
type USERSTYPE = {

    id: string;
    externalId: string;
    username: string;
}[] | undefined

const NoteHeader = ({ authorName, date, category, NoteCategoryEmoji, createdAt, updatedAt, recipients, sharedWith, Permissions }: {
    authorName: string,
    date: Date,
    category: string,
    NoteCategoryEmoji: string,
    createdAt: Date,
    updatedAt: Date,
    recipients: USERSTYPE,
    sharedWith: JsonValue | undefined,
    Permissions: PERMISSIONSTYPE | null
}) => (
    <div className="bg-opacity-70 bg-slate-300 dark:bg-background py-3 px-2 rounded-md w-full mx-auto flex align-middle justify-between dark:border-b">
        <div className=" flex flex-col text-sm text-gray-600 dark:text-gray-200 text-left">
            <p>By: {authorName}</p>
            <p>Dated: {new Date(date).toLocaleDateString()}</p>
            <p>{NoteCategoryEmoji}:{category}</p>
        </div>

        <NoteMeta Permissions={Permissions} createdAt={createdAt} updatedAt={updatedAt} recipients={recipients} sharedWith={sharedWith} />
    </div>
);

export default NoteHeader