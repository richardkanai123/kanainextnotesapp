'use client'

import SearchBar from "./SearchBar"

// hero nav to filter notes, search for notes and navigate to create note
const HeroNav = () => {
    return (
        <div className="bg-opacity-85 bg-slate-300 dark:bg-background py-3 px-2 rounded-md flex align-middle items-center justify-between" >
            <SearchBar />
        </div>
    )
}

export default HeroNav