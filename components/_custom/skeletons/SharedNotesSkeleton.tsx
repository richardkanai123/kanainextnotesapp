import React from 'react'

const SharedNotesSkeleton = () => {
    return (
        <div className='w-full h-[70vh] flex flex-col align-middle justify-center gap-2'>
            <h1>Loading Notes ...</h1>
            <div className='w-full h-3 bg-gray-300 animate-pulse delay-100 p-4 rounded'></div>
            <div className='w-full h-3 bg-gray-400 animate-pulse delay-150 p-4 rounded'></div>
            <div className='w-full h-3 bg-gray-300 animate-pulse delay-200 p-4 rounded '></div>
            <div className='w-full h-3 bg-gray-500 animate-pulse delay-300 p-4 rounded'></div>
        </div>
    )
}

export default SharedNotesSkeleton