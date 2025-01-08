'use client'
import { Button } from '@/components/ui/button'
import { UnPinNote } from '@/lib/actions';
import { LoaderPinwheelIcon } from 'lucide-react';
import { useState } from 'react';
import { RiUnpinFill } from "react-icons/ri";
import { toast } from 'react-toastify';

const UnpinNoteBtn = ({ NoteID }: { NoteID: string }) => {
    const [isPending, setIsPending] = useState(false)

    const UnPinNoteAction = async () => {
        try {
            setIsPending(true)
            const res = await UnPinNote(NoteID)
            if (res.success) {
                toast.success(res.message)
                setIsPending(false)
            } else {
                toast.error(res.message)
                setIsPending(false)
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
                setIsPending(false)
            }
            toast.error('An error occurred! Please try again.')
            setIsPending(false)
        }
    }

    return (
        <Button onClick={UnPinNoteAction} variant='ghost' asChild className='p-1' >
            {
                isPending ? <LoaderPinwheelIcon className='w-8 h-8 text-teal-300 animate-spin' />
                    :
                    <RiUnpinFill className='w-8 h-8 text-red-400' />
            }
        </Button>
    )
}

export default UnpinNoteBtn