import EmptyNotes from "@/components/_custom/EmptyNotes";
import Note_Card from "@/components/_custom/Note_Card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getNotes } from "@/lib/actions";
import Link from "next/link";
import { Suspense } from "react";
const Home = async () => {
  const notesResponse = await getNotes();
  if (!notesResponse.success) {
    return <EmptyNotes />;
  }
  const { notes } = notesResponse;

  const PinnedNotes = notes.filter((note) => note.isPinned);
  const UnpinneNotes = notes.filter((note) => !note.isPinned);

  return (
    <div className="w-full py-4 p-2 mx-auto">
      <h1 className="text-xl font-semibold mb-2">Pinned Notes</h1>
      <Suspense fallback={<p className="text-sm text-gray-500">Loading...</p>}>
        {PinnedNotes.length === 0 ? (
          <p className="text-sm text-gray-500">No Pinned Notes</p>
        ) : (
          <ScrollArea
            dir="ltr"
            className="w-full whitespace-nowrap rounded-md border-b mb-4 pb-4">
            <div className="flex w-max space-x-2">
              {PinnedNotes.map((note) => (
                <Note_Card
                  key={note.id}
                  Note={note}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </Suspense>

      <h1 className="text-xl font-semibold">Notes</h1>
      {/* grid of cards */}
      <Suspense fallback={<p className="text-sm text-gray-500">Loading notes...</p>}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center ">
          {
            UnpinneNotes.length === 0 ? (
              <div className="w-full flex flex-col items-center justify-center gap-4">
                <p className="text-sm text-gray-500">No Notes</p>
                <Link href="/create" className="text-sm font-semibold bg-lime-300 hover:bg-lime-400 text-sky-600 rounded-md shadow-sm  underline-offset-4 hover:underline p-3 ">Create a Note</Link>
              </div>
            ) : (

              UnpinneNotes.map((note) => (
                <Note_Card
                  key={note.id}
                  Note={note}
                />
              ))

            )
          }
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
