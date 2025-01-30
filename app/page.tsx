import EmptyNotes from "@/components/_custom/EmptyNotes";
import ErrorComponent from "@/components/_custom/ErrorCompponent";
import NavCatFilter from "@/components/_custom/NavCatFilter";
import PinnedNotesComponent from "@/components/_custom/PinnedNotesComponent";
import SearchBar from "@/components/_custom/SearchBar";
import UnPinnedNotesLister from "@/components/_custom/UnPinnedNotesLister";
import { getNotes } from "@/lib/actions";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";

const Home = async (props: {
  searchParams: SearchParams
}) => {
  const searchParamsRes = await props.searchParams
  const notesResponse = await getNotes();

  if (!notesResponse.success) {
    return <EmptyNotes />;
  }

  const { notes } = notesResponse;
  const PinnedNotes = notes.filter((note) => note.isPinned);
  const UnpinneNotes = notes.filter((note) => !note.isPinned);




  return (
    <div className="w-full py-4 p-2 mx-auto">
      <div className="w-full my-2">
        <div className="bg-opacity-85 bg-slate-300 dark:bg-background py-3 px-2 rounded-md flex align-middle items-center justify-center flex-col md:justify-around md:flex-row gap-4 md:gap-0 md:hidden" >

          <SearchBar />
        </div>
      </div>
      <h1 className="text-xl font-semibold mb-2">Pinned Notes</h1>
      <ErrorBoundary errorComponent={ErrorComponent} >
        <Suspense fallback={<p className="text-sm text-gray-500">Loading...</p>}>
          {PinnedNotes.length === 0 ? (
            <div className="w-full mb-4">
              <p className="text-sm text-gray-500 dark:text-accent-foreground">No Pinned Notes</p>
              <p className=" text-gray-700 dark:text-accent-foreground">Pin a note to fix it here </p>
            </div>
          ) : (
            <PinnedNotesComponent notes={PinnedNotes} />
          )}
        </Suspense>
      </ErrorBoundary>

      <div className="w-full flex items-center sm:justify-around md:justify-between md:gap-4 border-b mb-4 ">
        <h1 className="text-xl font-semibold  "> Notes</h1>
        <NavCatFilter />
      </div>
      {/* grid of cards */}
      <ErrorBoundary errorComponent={ErrorComponent} >
        <Suspense fallback={<p className="text-sm text-gray-500">Loading notes...</p>}>
          <UnPinnedNotesLister Notes={UnpinneNotes} SearchParams={searchParamsRes} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Home;
