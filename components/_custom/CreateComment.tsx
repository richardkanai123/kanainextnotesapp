'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { CreateNewComment } from "@/lib/actions"
import { useUser } from '@clerk/nextjs'
const FormSchema = z.object({
    comment: z.string().nonempty("Comment is required").min(1, {
        message: "Bio must be at least 1 character.",
    })
        .max(100, {
            message: "Bio must not be longer than 100 characters.",
        })
})

const CreateComment = ({ note }: { note: string }) => {
    const { user, isSignedIn } = useUser()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {

        const createCommentRes = await CreateNewComment(note, data.comment, user?.id as string)
        if (!createCommentRes.success) {
            form.setError("comment", {
                type: "manual",
                message: createCommentRes.message
            })
            return false
        }

        form.setValue("comment", "")
    }




    if (!isSignedIn || !user) {
        return (
            <div className="w-full flex flex-col text-red-500" >
                <h1 className="text-2xl font-semibold mb-2 ">You need to be signed in to comment</h1>
            </div>
        )
    }



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-2/3 space-y-6 mx-auto mt-6 px-2 pb-4">
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your comment here"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Create a comment, this will be visible to other users who view this note.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type="submit">
                    {form.formState.isSubmitting ? "Commenting..." : "Comment"}
                </Button>
            </form>
        </Form>
    )
}

export default CreateComment