import React from 'react'

const SharedNotesLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className='flex-1 flex min-h-screen w-full'>
            <div className="w-full h-full mx-auto flex flex-col justify-center align-middle lg:flex-row lg:justify-around">
                {children}
            </div>
        </div>
    )
}

export default SharedNotesLayout