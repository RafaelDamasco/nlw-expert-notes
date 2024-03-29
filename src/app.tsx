import { ChangeEvent, useState } from 'react';
import logo from './assets/logo-nlw-expert.svg';
import NewNoteCard from './components/new-note-card';
import NoteCard from './components/note-card';

interface Note {
  id: string;
  date: Date;
  content: string;
}
function App() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes');
    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }
    return [];
  });

  const onNoteCreated = (content: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];
    setNotes(notesArray);

    localStorage.setItem('notes', JSON.stringify(notesArray));
  };

  const onNoteDeleted = (id: string) => {
    const newArray = notes.filter((note) => note.id !== id);

    setNotes(newArray);

    localStorage.setItem('notes', JSON.stringify(newArray));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
  };

  const filteredNotes =
    search !== ''
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5 md:px-0">
      <img
        src={logo}
        alt="NLW Expert"
      />
      <form className="w-full">
        <input
          type="text"
          placeholder="Find your notes..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map((note) => (
          <NoteCard
            note={note}
            key={note.id}
            onNoteDeleted={onNoteDeleted}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
