import SharedNotesSidebar from '@/components/_custom/SharedNotesSidebar'
import React from 'react'

const SharedNotesLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className='flex-1 flex min-h-screen w-full'>
            <SharedNotesSidebar />
            <div className="w-full h-full">
                {children}
            </div>
        </div>
    )
}

export default SharedNotesLayout