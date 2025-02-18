import { ScrollArea } from '@/components/ui/scroll-area'
import SideBarToggleBtn from '@/components/_custom/Buttons/SideBarToggleBtn'
import SharedNoteComponent from './SharedNoteComponent'
import { NOTE_TYPE } from '@/lib/Types'

const SideBarContent = ({ notes }: { notes: NOTE_TYPE[] }) => {

    // filter sort by update date 
    const NotesFilteredByTime = notes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5)
    return (
        <div className='h-full min-h-screen w-[200px] max-w-sm border-r relative transition-all ease-in-out duration-300 animate-out'>
            <SideBarToggleBtn />
            <div className="w-full p-3">
                <div className="w-full flex align-middle border-b">
                    <h1 className="text-base font-semibold mb-2 ">Recent Notes</h1>
                </div>
                <ScrollArea className='space-y-2 '>
                    {NotesFilteredByTime.map((item) => (
                        <SharedNoteComponent key={item.id} note={item} />
                    ))}
                </ScrollArea>
            </div>
        </div >
    )
}

export default SideBarContent