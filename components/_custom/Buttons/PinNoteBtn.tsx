'use client'
import { Button } from '../../ui/button'
import { TiPin } from "react-icons/ti";
import { RiUnpinFill } from "react-icons/ri";
import { UnPinNote, PinNote } from '@/lib/actions';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { LoaderPinwheel } from 'lucide-react';
const PinNoteBtn = ({ NoteID, pinned }: { NoteID: string, pinned: boolean }) => {

    const [isPending, setIsPending] = useState(false)
    const PinUnNoteAction = async () => {

        if (pinned) {
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
        } else {
            try {
                setIsPending(true)
                const res = await PinNote(NoteID)
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
    }


    return (
        <Button onClick={PinUnNoteAction} variant='secondary' className='max-w-[200px]' >
            <span className="ml-1">{pinned ? 'Unpin Note' : 'Pin Note'}</span>
            {
                isPending ? <LoaderPinwheel className='w-6 h-6 animate-spin text-lime-600' />
                    :

                    pinned ?
                        <RiUnpinFill className="w-8 h-8 text-red-400" />
                        :
                        <TiPin className="w-6 h-6 text-lime-500" />
            }

        </Button>
    )
}

export default PinNoteBtn