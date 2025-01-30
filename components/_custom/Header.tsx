'use client'
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./ModeToggle"
import Image from "next/image"
import { UserButton, useUser } from "@clerk/nextjs"
import SearchBar from "./SearchBar"
import { Home } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { MdAddComment } from "react-icons/md";
import { IoChatbubbles } from "react-icons/io5";
import { Suspense } from "react"


const Header = () => {
    const { isSignedIn } = useUser()
    const pathName = usePathname()
    const defaultLinkStyles = 'flex align-middle items-center outline-1 bg-secondary text-primary  hover:bg-transparent font-semibold relative z-0 rounded  p-2 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-slate-700 after:transition-[all_0.3s_ease]  hover:after:w-full'

    const activeLinkStyles = 'flex align-middle items-center text-secondary outline-1 bg-primary hover:bg-transparent font-semibold relative z-0 rounded  p-2 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-slate-700 after:transition-[all_0.3s_ease]  hover:after:w-full'


    return (
        <Suspense fallback={<div className="w-full animate-pulse rounded p-2 bg-slate-400 dark:bg-background"></div>}>
            <div className='w-full mx-auto flex align-middle items-center justify-between bg-slate-200 dark:bg-background dark:border-b'>
                <Link href='/' className='text-2xl font-bold text-primary '>
                    <Image src="/logo.png" alt="Logo" width={40} height={30} />
                </Link>
                <div className="h-full align-middle items-center gap-4 hidden md:flex">
                    {
                        pathName === '/' && <SearchBar />
                    }
                </div>

                <div className=" flex align-middle items-center gap-3 ">
                    <Link href='/' className={pathName === '/' ? activeLinkStyles : defaultLinkStyles} >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Home className="w-6 h-6" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span>Home</span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>

                    <Link href='/create' className={pathName === '/create' ? activeLinkStyles : defaultLinkStyles}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <MdAddComment className="w-6 h-6" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span>Add new</span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>

                    <Link href='/shared' className={pathName === '/shared' ? activeLinkStyles : defaultLinkStyles}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <IoChatbubbles className="w-6 h-6" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span>Shared Notes</span>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                    <div className="aspect-square rounded-full flex h-full align-middle justify-center items-center gap-2">
                        <div className="">
                            <ModeToggle />
                        </div>
                        {
                            isSignedIn ? (
                                <div className="p-2">
                                    <UserButton appearance={{ elements: { userButtonAvatarBox: "h-8 w-8 self-center", userButtonBox__open: "h-8 w-8 self-center" } }} signInUrl="/sign-in" />
                                </div>
                            ) : (
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>si</AvatarFallback>
                                </Avatar>


                            )}
                    </div>
                </div>
            </div >
        </Suspense>
    )
}

export default Header