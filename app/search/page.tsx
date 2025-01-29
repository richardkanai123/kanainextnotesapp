import EmptyNotes from "@/components/_custom/EmptyNotes";
import { NoteDialog } from "@/components/_custom/NoteDialog";
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
    const titleSearch = results.title;
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

    const searchedNotes = notes.notes.filter((note) =>
        note.title.toLocaleLowerCase().includes(titleSearch as string)
    );

    if (searchedNotes.length === 0) {
        return (
            <div className="w-full py-4 p-2 mx-auto space-y-4">
                <div className="w-full px-2 py-4 flex align-middle border-b">
                    <Link href='/' className="flex align-middle items-center shadow-sm outline-1 bg-accent hover:bg-transparent text-sm font-semibold relative z-0 rounded  px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-slate-700 after:transition-[all_0.3s_ease]  hover:after:w-full" >
                        <FaHome className='w-6 h-6 mr-2' /> Home
                    </Link>
                    <h1 className="text-center mx-auto">Search Results for :{titleSearch}</h1>
                </div>
                <h1 className="text-2xl font-semibold">No notes found for:<span className="text-purple-400">{titleSearch}</span> </h1>
                <p>Please try again with a different search term</p>
            </div>
        )
    }

    // relative z-0 rounded bg-pink-500 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-pink-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">

    return (
        <Suspense fallback={<p className="text-sm text-gray-500">Loading notes...</p>}>

            <div className="w-full py-4 p-2 mx-auto space-y-4">
                <div className="w-full px-2 py-4 flex align-middle border-b">
                    <Link href='/' className="flex align-middle items-center shadow-sm outline-1 bg-accent hover:bg-transparent text-sm font-semibold relative z-0 rounded  px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-slate-700 after:transition-[all_0.3s_ease]  hover:after:w-full" >
                        <FaHome className='w-6 h-6 mr-2' /> Home
                    </Link>
                    <h1 className="text-center mx-auto">Search Results for :{titleSearch}</h1>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center ">
                    {searchedNotes.map((note) => (
                        <NoteDialog
                            Note={note}
                            key={note.id}
                        />
                    ))}
                </div>
            </div>
        </Suspense>
    );
}
