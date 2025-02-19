'use client'
import { NOTE_TYPE } from '@/lib/Types'
import { DaysFromToday } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
const SharedNoteLink = ({ note, username, imageurl }: {
    note: NOTE_TYPE, username: string | null, imageurl: string | null
}) => {
    const { id, title, createdAt } = note
    const CreatedAt = new Date(createdAt)
    const fromNow = DaysFromToday(CreatedAt)

    const pathname = usePathname()

    const { user } = useUser()
    return (
        <Link prefetch href={`/shared/${id}`} className={pathname === `/shared/${id}` ? " text-primary border-none" : "bg-lime-300"}>
            <div className="border-b py-1 w-full flex align-middle items-center">
                {
                    user ? <div className="w-8 h-8 rounded-full overflow-hidden relative object-cover">
                        <Image src={imageurl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} alt={username || 'user avatar loading'} fill className="object-cover" />
                    </div> : null

                }
                <div className="w-full flex flex-col align-middle items-center gap-2">

                    <p className="font-semibold text-xs">{title.slice(0, 10)}... </p>
                    <p className="text-sm italic text-right font-light">{fromNow}</p>
                </div>
            </div>
        </Link >
    )
}

export default SharedNoteLink