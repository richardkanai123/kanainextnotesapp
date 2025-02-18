import { PERMISSIONSTYPE } from "@/lib/Types";
import { JsonValue } from "@prisma/client/runtime/library";


type USERSTYPE = {

    id: string;
    externalId: string;
    username: string;
}[] | undefined


const NoteMeta = ({ createdAt, updatedAt, recipients, sharedWith, Permissions }: {
    createdAt: Date,
    updatedAt: Date,
    recipients: USERSTYPE,
    sharedWith: JsonValue | undefined,
    Permissions: PERMISSIONSTYPE | null
}) => (
    <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-200 text-sm">
        <p>Created: {`${new Date(createdAt).toLocaleDateString()}:${new Date(createdAt).toLocaleTimeString()}`}</p>
        <p>Updated: {`${new Date(updatedAt).toLocaleDateString()}:${new Date(updatedAt).toLocaleTimeString()}`}</p>
        {sharedWith && Permissions?.canEdit && (
            <p className="italic">
                Shared with: {recipients && recipients.length > 1 ? `${recipients[0].username} and ${recipients.length - 1} others` : recipients && recipients.length === 1 ? `${recipients[0].username}` : "none"}
            </p>
        )}
    </div>
);

export default NoteMeta