'use client'

import { Button } from '@/components/ui/button';
import { LoaderPinwheelIcon, SendHorizonalIcon, SendHorizontalIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/ui/card';
import { Check, ChevronsUpDown } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { toast } from 'react-toastify';
import { ShareNoteAction } from '@/lib/actions';
import { useState } from 'react';

interface ShareNoteBtnProps {
    users: {
        id: string;
        externalId: string;
        username: string;
    }[] | undefined;
    noteid: string;
}


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
        console.log(data)
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                    <SendHorizonalIcon className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[500px] px-2 ">
                <DialogHeader>
                    <DialogTitle>Share Note</DialogTitle>
                    <DialogDescription>
                        Select a user to share the note with
                    </DialogDescription>
                </DialogHeader>
                <Card className="w-full max-w-[400px] min-h-fit py-2 bg-card rounded-md overflow-hidden relative animate-in transition-all ease-in border-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(ShareNote)} className=" w-full flex justify-between align-middle gap-2 ">
                            <FormField
                                control={form.control}
                                name="targetReceipient"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-[200px] justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? users.find(
                                                                (user) => user.externalId === field.value
                                                            )?.username
                                                            : "Select a user..."}
                                                        <ChevronsUpDown className="opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Search user..."
                                                        className="h-9"
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            No user found
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {users.map((user) => (
                                                                <CommandItem
                                                                    value={user.externalId}
                                                                    key={user.id}
                                                                    onSelect={() => {
                                                                        form.setValue("targetReceipient", user.externalId)
                                                                    }}
                                                                >
                                                                    {user.username}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto",
                                                                            user.externalId === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={form.formState.isSubmitting || form.formState.isDirty || users.length === 0}>
                                {
                                    form.formState.isSubmitting ?
                                        "Sharing..." : "Share"
                                }
                                {
                                    form.formState.isSubmitting ?
                                        <LoaderPinwheelIcon className="w-4 h-4 animate-spin text-lime-300" />
                                        : <SendHorizontalIcon className="w-4 h-4 ml-2" />
                                }
                            </Button>
                        </form>
                    </Form>
                </Card>
            </DialogContent>
        </Dialog>
    )
}

export default ShareNoteBtn