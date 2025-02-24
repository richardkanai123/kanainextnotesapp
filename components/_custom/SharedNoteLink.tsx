'use client'
import { NOTE_TYPE } from '@/lib/Types'
import { DaysFromToday } from '@/lib/utils'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
const SharedNoteLink = ({ note, username, imageurl }: {
    note: NOTE_TYPE, username: string | null, imageurl: string | null
}) => {
    const { id, title, createdAt } = note
    const CreatedAt = new Date(createdAt)
    const fromNow = DaysFromToday(CreatedAt)


    const { user, isLoaded } = useUser()
    return (
        <Link prefetch href={`/shared/${id}`} className='bg-accent w-full md:max-w-[500px] p-2 mx-auto rounded-full overflow-hidden transition-all duration-200 ease-in hover:bg-background hover:shadow-lg ' >
            <div className="w-full flex   align-middle items-center gap-4">
                <div className="w-10 h-10 border rounded-full overflow-hidden relative object-cover flex flex-col justify-center items-center">

                    {
                        user || isLoaded ? <div className="w-10 h-10 rounded-full overflow-hidden relative object-cover flex flex-col">
                            <Image loader={() => { return imageurl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' }} src={imageurl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} alt={username || 'user avatar loading'} fill className="object-cover" />
                        </div> : null

                    }
                </div>

                <div className="flex-1 flex flex-col  pr-2">
                    <p className="font-semibold text-lg md:text-xl">{title.slice(0, 20)} </p>
                    <p className="text-xs font-light text-gray-400">{username}</p>
                </div>
                <p className="text-sm italic text-right text-gray-400 font-light">{fromNow}</p>


            </div>
        </Link >
    )
}

export default SharedNoteLink