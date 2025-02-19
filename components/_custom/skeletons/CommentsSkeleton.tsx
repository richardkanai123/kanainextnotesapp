import React from 'react'

const CommentsSkeleton = () => {
    return (
        <div className='w-full animate-pulse space-y-4 delay-300'>
            <div className='space-y-3'>
                {[1, 2, 3].map((index) => (
                    <div key={index} className='flex gap-4'>
                        <div className='w-10 h-10 bg-gray-200 rounded-full'></div>
                        <div className='flex-1 space-y-2'>
                            <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                            <div className='h-3 bg-gray-200 rounded w-3/4'></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommentsSkeleton