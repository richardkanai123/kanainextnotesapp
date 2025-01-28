'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const CommentSectionError = () => {
    const Router = useRouter()
    return (
        <div className='w-full space-y-3 mx-auto px-4 flex flex-col gap-4 mt-4 align-middle items-center' >
            <h1 className='text-base font-semibold mb-2 text-left'>Comments</h1>
            <p className='text-sm text-red-500 '>An error occurred while fetching comments</p>
            <Button variant='destructive' size='lg' className="mx-auto " onClick={() => Router.refresh()} >Retry Fetching</Button>
        </div>
    )
}

export default CommentSectionError