import Note_Card from "@/components/_custom/Note_Card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { getNotes } from "@/lib/actions"
import { sampleNotes } from "@/lib/Constants/sample"
const Home = async () => {
  const notes = await getNotes()
  console.log(notes)

  const PinnedNotes = sampleNotes.filter((note) => note.pinned)
  const UnpinneNotes = sampleNotes.filter((note) => !note.pinned)

  return (
    <div className="w-full py-4 p-2 mx-auto">
      <h1 className="text-xl font-semibold">Pinned Notes</h1>
      <ScrollArea dir="ltr" className="w-full whitespace-nowrap rounded-md border mb-4 pb-4">
        <div className="flex w-max space-x-2">
          {PinnedNotes.map((note) => (
            <Note_Card key={note.id} Note={note} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea >

      <h1 className="text-xl font-semibold">Notes</h1>
      {/* grid of cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center ">
        {UnpinneNotes.map((note) => (
          <Note_Card key={note.id} Note={note} />
        ))}
      </div>
    </div>

  )
}

export default Home