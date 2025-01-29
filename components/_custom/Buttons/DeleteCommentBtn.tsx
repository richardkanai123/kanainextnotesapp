'use client'
import { Button } from '@/components/ui/button'
import { DeleteComment } from '@/lib/actions'
import { Trash2Icon } from 'lucide-react'
import React from 'react'
import { toast } from 'react-toastify'

const DeleteCommentBtn = ({ comment_id, userid }: { comment_id: string, userid: string }) => {

    const DeleteCommentAction = async (comment_id: string, userid: string) => {
        const res = await DeleteComment(comment_id, userid)
        if (!res.success) {
            toast.error(res.message)
            return
        }

        toast.info(res.message, {
            icon: () => <Trash2Icon className="w-4 h-4" />,
        })
    }

    return (
        <Button onClick={() => DeleteCommentAction(comment_id, userid)} variant='ghost' className='mx-auto text-red-400' size='icon'>
            <Trash2Icon className="h-5 w-5" />
        </Button>
    )
}

export default DeleteCommentBtn