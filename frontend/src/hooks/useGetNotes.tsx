import { useEffect, useState } from "react";
import { Note as NoteModel } from "../models/note";
import * as NotesApi from "../network/notes_api.ts";

export default function useGetNotes() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const notes = await NotesApi.fetchNotes();

        console.log(notes);

        setNotes(notes);
      } catch (err) {
        console.error(err);
      }
    }

    fetchNotes();
  }, []);

  return [notes, setNotes];
}
