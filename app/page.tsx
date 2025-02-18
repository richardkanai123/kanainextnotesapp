import EmptyNotes from "@/components/_custom/EmptyNotes";
import ErrorComponent from "@/components/_custom/ErrorCompponent";
import NavCatFilter from "@/components/_custom/NavCatFilter";
import PinnedNotesComponent from "@/components/_custom/PinnedNotesComponent";
import SearchBar from "@/components/_custom/SearchBar";
import UnPinnedNotesLister from "@/components/_custom/UnPinnedNotesLister";
import { getNotes } from "@/lib/actions";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";

const Home = async () => {

  const notesResponse = await getNotes();

  if (!notesResponse.success) {
    return <EmptyNotes />;
  }

  const { notes } = notesResponse;
  const PinnedNotes = notes.filter((note) => note.isPinned);
  const UnpinnedNotes = notes.filter((note) => !note.isPinned);

  return (
    <div className="w-full py-4 p-2 mx-auto">
      <div className="w-full my-2">
        <Suspense fallback={<div className='w-full animate-pulse rounded p-2'>
          <div className='w-1/3 h-4 bg-slate-400 dark:bg-background rounded'></div>
        </div>}>
          <div className="w-full mx-auto md:w-3/4 ">
            <SearchBar />
          </div>
        </Suspense>
      </div>
      <h1 className="text-xl font-semibold mb-2">Pinned Notes</h1>
      <ErrorBoundary errorComponent={ErrorComponent}>
        <Suspense fallback={<p className="text-sm text-gray-500">Loading...</p>}>
          {PinnedNotes.length === 0 ? (
            <div className="w-full mb-4">
              <p className="text-sm text-gray-500 dark:text-accent-foreground">No Pinned Notes</p>
              <p className="text-gray-700 dark:text-accent-foreground">Pin a note to fix it here</p>
            </div>
          ) : (
            <PinnedNotesComponent notes={PinnedNotes} />
          )}
        </Suspense>
      </ErrorBoundary>

      <div className="w-full flex items-center sm:justify-around md:justify-between md:gap-4 border-b mb-4">
        <h1 className="text-xl font-semibold">Notes</h1>
        <Suspense fallback={<p className="text-sm text-gray-500">Loading filter...</p>}>
          <NavCatFilter />
        </Suspense>
      </div>
      {/* grid of cards */}
      <ErrorBoundary errorComponent={ErrorComponent}>
        <Suspense fallback={<p className="text-sm text-gray-500">Loading notes...</p>}>
          <UnPinnedNotesLister Notes={UnpinnedNotes} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Home;
