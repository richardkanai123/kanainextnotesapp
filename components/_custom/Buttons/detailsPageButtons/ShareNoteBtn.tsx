'use client'
import { LoaderPinwheelIcon, SendHorizonalIcon, SendHorizontalIcon } from 'lucide-react';

import { toast } from 'react-toastify';
import { ShareNoteAction } from '@/lib/actions';
import { useState } from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ShareNoteBtnProps {
    users: {
        id: string;
        externalId: string;
        username: string;
    }[] | undefined;
    noteid: string;
}


// const FormSchema = z.object({
//     targetReceipient: z.array(z.string()).nonempty('Please select a user to share with').min(1, 'Please select a user to share with')
// })

const FormSchema = z.object({
    targetReceipient: z.string()
})

const ShareNoteBtn = ({ users, noteid }: ShareNoteBtnProps) => {

    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    if (!users) {
        return null
    }
    const ShareNote = async (data: z.infer<typeof FormSchema>) => {
        try {
            const shareRes = await ShareNoteAction(noteid, data.targetReceipient)
            if (!shareRes.success) {
                toast.error(shareRes.message)
                return
            }
            const newRecipient = users.find(user => user.externalId === data.targetReceipient)
            toast.info(`Successfully shared with ${newRecipient?.username}`, {
                icon: <SendHorizontalIcon className="w-4 h-4" />
            })
            form.reset()
            setOpen(false)
        } catch (error) {
            if (error instanceof Error) {
                setOpen(false)
                toast.error(error.message)
            } else {
                setOpen(false)
                toast.error('Something went wrong, please try again!')
            }
        }
    }
    return (
        <Drawer direction='bottom' open={open} onOpenChange={setOpen}>
            <DrawerTrigger className='p-1 border bg-primary text-white cursor-pointer' asChild>
                <SendHorizonalIcon className="w-6 h-6 text-xl rounded " />
            </DrawerTrigger>
            <DrawerContent className="mx-auto max-w-screen-sm px-2 pb-4 ">
                <DrawerHeader>
                    <DrawerTitle>Share Note</DrawerTitle>
                    <DrawerDescription>
                        Select a user to share the note with
                    </DrawerDescription>
                </DrawerHeader>

                <form onSubmit={form.handleSubmit(ShareNote)}>
                    <div className="grid gap-4 py-4 mx-auto w-full max-w-2xl">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="targetReceipient" className="text-right font-medium">
                                Select User
                            </label>
                            <div className="col-span-3">
                                <select
                                    {...form.register('targetReceipient')}
                                    id="targetReceipient"
                                    name="targetReceipient"
                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                >
                                    <option value="">Select a user</option>
                                    {users.map((user) => (
                                        <option key={user.externalId} value={user.externalId}>
                                            {user.username}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <Button disabled={form.formState.isSubmitting || !form.formState.isValid} type='submit' className='text-white w-full max-w-sm mx-auto' variant='default' size='lg'>
                            Share {
                                form.formState.isSubmitting ? <LoaderPinwheelIcon className='w-4 h-4 animate-spin' /> : <SendHorizonalIcon className="w-4 h-4" />
                            }
                        </Button>

                    </div>
                </form>

                <DrawerFooter>
                    {/* <Button variant='default'>
                        Share
                    </Button> */}
                    <DrawerClose className={cn('bg-red-500', 'text-white rounded-lg text-lg p-2 w-full max-w-sm mx-auto')} onClick={() => setOpen(false)}>
                        Cancel
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ShareNoteBtn