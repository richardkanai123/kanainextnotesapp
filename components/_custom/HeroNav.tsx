'use client'

import Link from "next/link"
import SearchBar from "./SearchBar"
import { Button } from "../ui/button"
import { IoCreate } from "react-icons/io5"


// hero nav to filter notes, search for notes and navigate to create note
const HeroNav = () => {
    return (
        <div className="bg-opacity-85 bg-slate-300 dark:bg-background py-3 px-2 rounded-md flex align-middle items-center justify-center flex-col md:justify-around md:flex-row gap-4 md:gap-0" >
            <Button variant='default'>
                <Link href="/create" className="w-full">
                    <span className="sm:hidden md:block ">Create Note</span>
                </Link>
                <IoCreate className="w-6 h-6" />
            </Button>
            <SearchBar />

        </div>
    )
}

export default HeroNav