'use client'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const CommentSectionError = () => {
    const Router = useRouter()
    return (
        <div className='w-full max-w-2xl mx-auto p-6 flex flex-col items-center space-y-4 text-center'>
            <h2 className='text-xl font-semibold text-yellow-800'>Unable to Load Comments</h2>
            <div className='space-y-2'>
                <p className='text-red-600 font-medium'>There was a problem loading the comments section.</p>
                <p className='text-sm text-gray-600'>This might be due to a network issue or server problem.</p>
            </div>
            <Button
                variant='destructive'
                size='lg'
                onClick={() => Router.refresh()}
                className='mt-4 hover:opacity-90 transition-opacity'
            >
                Try Again
            </Button>
        </div>
    )
}

export default CommentSectionError