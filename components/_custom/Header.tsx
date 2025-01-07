'use client'
import Link from "next/link"
import { FaHome } from "react-icons/fa"
import { IoAddCircle } from "react-icons/io5"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./ModeToggle"
import Image from "next/image"

import { RiUserSharedFill } from "react-icons/ri";

const Header = () => {
    const pathName = usePathname()
    const defaultLinkStyles = 'text-primary p-2 h-fit rounded-sm flex flex-col align-middle justify-center items-center hover:bg-primary hover:text-white transition-all ease-in delay-100 aspect-square'

    const activeLinkStyles = 'text-primary p-2 h-fit rounded-sm flex flex-col align-middle justify-center items-center bg-primary hover:bg text-white hover:text-primary transition-all ease-in delay-100 aspect-square'


    return (
        <div className='w-full mx-auto px-4 flex align-middle items-center justify-between bg-slate-200 dark:bg-background dark:border-b  '>
            <Link href='/' className='text-2xl font-bold text-primary'>
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </Link>

            <div className="h-full flex align-middle items-center gap-4 ">
                <Link href='/' className={pathName === '/' ? activeLinkStyles : defaultLinkStyles}>
                    <FaHome className='w-6 h-6' />

                </Link>
                <Link href='/create' className={pathName === '/create' ? activeLinkStyles : defaultLinkStyles}>
                    <IoAddCircle className='w-6 h-6' />
                </Link>

                <Link href='/shared' className={pathName === '/shared' ? activeLinkStyles : defaultLinkStyles}>
                    <RiUserSharedFill className='w-6 h-6' />
                </Link>

                <div className="aspect-square rounded-full flex h-full align-middle justify-center items-center p-2 gap-2">

                    <div className="">
                        <ModeToggle />
                    </div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    )
}

export default Header