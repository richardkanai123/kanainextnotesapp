'use client'
import { Button } from '@/components/ui/button'
import { deleteNote } from '@/lib/actions'
import { Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { FaSpinner } from 'react-icons/fa'
import { useState } from 'react'
const DeleteNoteBtn = ({ NoteID }: { NoteID: string }) => {
    const [pending, setPending] = useState(false)
    const DeleteNoteAction = async () => {
        setPending(true)
        const res = await deleteNote(NoteID)
        if (!res.success) {
            toast.error(res.message)
            setPending(false)
            return
        }
        toast.success(res.message, {
            icon: <Trash2Icon className="w-4 h-4" />,
        })
        setPending(false)
        Router.push('/')
    }


    const Router = useRouter()

    return (
        <Button onClick={DeleteNoteAction} variant='destructive' size='icon'>
            {
                pending ? <FaSpinner className="w-4 h-4 animate-spin" /> : <Trash2Icon className="w-4 h-4" />
            }
        </Button>
    )
}

export default DeleteNoteBtn