'use client'
import { NOTE_TYPE } from '@/lib/Types'
import { DaysFromToday } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
const SharedNoteLink = ({ note, authorNameRes }: {
    note: NOTE_TYPE, authorNameRes: {
        success: boolean;
        message: string;
        username: null;
    } | {
        success: boolean;
        message: string;
        username: string;
    }
}) => {
    const { id, title, createdAt } = note
    const CreatedAt = new Date(createdAt)
    const fromNow = DaysFromToday(CreatedAt)

    const pathname = usePathname()

    const { user } = useUser()
    return (
        <Link prefetch href={`/shared/${id}`} className={pathname === `/shared/${id}` ? " text-primary border-none bg-lime-500" : ""}>
            <div className="border-b py-1 w-full flex align-middle items-center">
                {
                    user ? <Image src={user.imageUrl} alt={authorNameRes.username || 'user avatar loading'} width={40} height={40} className="rounded-full" /> : null
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