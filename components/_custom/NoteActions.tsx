import { EditIcon } from "lucide-react";
import DeleteNoteBtn from "./Buttons/detailsPageButtons/DeleteBtn";
import ShareNoteBtn from "./Buttons/detailsPageButtons/ShareNoteBtn";
import { Button } from "../ui/button";
import PinNoteBtn from "./Buttons/detailsPageButtons/PinNoteBtn";
import { PERMISSIONSTYPE, USERSTYPE } from "@/lib/Types";
import { useRouter } from "next/navigation";

const NoteActions = ({ id, isPinned, Permissions, PossibleRecipients }: {
    id: string;
    isPinned: boolean;
    Permissions: PERMISSIONSTYPE | null;
    PossibleRecipients: USERSTYPE | null;

}) => {

    const Router = useRouter()

    return (
        <div className="w-full md:max-w-screen-sm my-4 flex align-middle justify-center items-center flex-wrap gap-4">
            {Permissions?.canPin && <PinNoteBtn NoteID={id} pinned={isPinned} />}
            {Permissions?.canEdit && (
                <Button onClick={() => Router.push(`/edit/${id}?scroll=true`)} variant='outline' size='icon'>
                    <EditIcon className="w-4 h-4" />
                </Button>
            )}
            {Permissions?.canShare && <ShareNoteBtn users={PossibleRecipients || undefined} noteid={id} />}
            {Permissions?.canDelete && <DeleteNoteBtn NoteID={id} />}
        </div>

    )
};

export default NoteActions