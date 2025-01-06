'use client'
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { IoAdd, IoCalendarNumber } from "react-icons/io5";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { LoaderPinwheel } from "lucide-react"
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation"
import { Input } from "../ui/input"
import dynamic from "next/dynamic"


const TipTap = dynamic(() => import("@/components/_custom/Tiptap"), { ssr: false })

const schema = z.object({
    title: z.string({
        message: 'Invalid title'
    }).nonempty({
        message: 'Title is required'
    }),
    content: z.string({
        message: 'Invalid content'
    }).nonempty({
        message: 'Content is required'
    }),
    date: z.date({
        message: 'Invalid date'
    })
})


const CreateNoteForm = () => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            content: '',
            date: new Date()
        }
    })


    const Router = useRouter()

    return (
        <div className='w-full px-2 py-4'>
            <div className="w-full px-2 py-4 flex align-middle ">.
                <Button onClick={() => Router.back()} variant='outline' className=' '>
                    <IoIosArrowBack className='w-6 h-6' />
                </Button>
                <h3 className='mx-auto  text-lg font-semibold text-primary'>
                    Creating Note
                </h3>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(
                    (data) => {
                        console.log(form.formState.isSubmitting)
                        //    WAIT FOR THREE SECS
                        setTimeout(() => console.log(data), 3000)

                    }
                )} className="space-y-8 mx-auto max-w-screen-md bg-secondary p-4 rounded-lg ">

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Note Title
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>This is your public display name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="date"

                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-lg"  >Note Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <IoCalendarNumber className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Date of occurence
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg">Note</FormLabel>
                                <FormControl>
                                    <TipTap content={field.value} onChange={field.onChange} />
                                </FormControl>
                                <div className="w-full py-2 flex flex-col items-center">
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button disabled={form.formState.isSubmitting || form.formState.isValidating || form.formState.isLoading || !form.formState.isValid} className="disabled:bg-opacity-25 flex align-middle" type="submit">
                        Create Note
                        {form.formState.isSubmitting ? <LoaderPinwheel className="w-6 h-6 mr-2 animate-spin" /> : <IoAdd className="w-6 h-6 mr-2" />}
                    </Button>
                </form>
            </Form>
        </div >
    )
}

export default CreateNoteForm