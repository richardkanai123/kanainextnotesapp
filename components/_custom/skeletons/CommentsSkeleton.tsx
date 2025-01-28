import React from 'react'

const CommentsSkeleton = () => {
    return (
        <div className='w-full animate-pulse rounded'>
            <h1 className='text-2xl font-semibold mb-2'>Comments</h1>
            <p className='text-sm text-gray-400'>Loading comments...</p>
        </div>
    )
}

export default CommentsSkeleton