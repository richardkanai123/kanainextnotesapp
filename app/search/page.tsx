import EmptyNotes from "@/components/_custom/EmptyNotes";
import { NoteDialog } from "@/components/_custom/NoteDialog";
import SearchBar from "@/components/_custom/SearchBar";
import { getNotes } from "@/lib/actions";
import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";
import { Suspense } from "react";
import { FaHome } from "react-icons/fa";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const results = await searchParams;
    const titleSearch = results.title as string | undefined;
    const notes = await getNotes();

    if (!notes.success) {
        return (
            <div className="w-full text-center">
                <h1>Unable to fetch notes</h1>
                <p>Please try again later</p>
            </div>
        );
    }

    if (notes.success && notes.notes.length === 0) {
        return <EmptyNotes />;
    }

    const searchedNotes = titleSearch === undefined || titleSearch === '' ? notes.notes : notes.notes.filter((note) => note.title.toLowerCase().includes(titleSearch?.toLowerCase()));
    return (
        <div className="w-full py-4 mx-auto space-y-4">
            <div className="w-full flex align-middle items-center border-b pb-2">
                <Link href='/' className="flex align-middle items-center shadow-sm outline-1 bg-accent hover:bg-transparent text-sm font-semibold relative z-0 rounded p-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-slate-700 after:transition-[all_0.3s_ease]  hover:after:w-full" >
                    <FaHome className='w-6 h-6 mr-2' /> Home
                </Link>
                <h1 className="text-center mx-auto text-sm md:text-lg">Searched :{titleSearch}</h1>
            </div>

            <div className="w-full mx-auto md:w-3/4 p-1">
                <SearchBar />
            </div>


            <Suspense fallback={<p className="text-sm text-gray-500">Loading notes...</p>}>
                {searchedNotes.length === 0 ? (
                    <div className="w-full flex justify-center items-center space-x-4">
                        <div className="w-24 h-24">
                            <svg
                                className="w-full h-full text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold">No results found</h2>
                            <p className="text-sm text-gray-500">
                                Try searching for something else
                            </p>
                        </div>
                    </div>
                )
                    : (

                        <div className="w-full lg:max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center ">
                            {searchedNotes.map((note) => (
                                <NoteDialog
                                    Note={note}
                                    key={note.id}
                                />
                            ))}
                        </div>
                    )
                }
            </Suspense >
        </div>
    );
}

