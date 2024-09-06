import { Note } from "../models/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  if (res.ok) {
    return res;
  } else {
    const errorBody = await res.json();
    const errorMsg = errorBody.error;
    throw Error(errorMsg);
  }
}

/**
 * FETCH NOTES
 * @returns all notes
 */
export async function fetchNotes(): Promise<Note[]> {
  const res = await fetchData("/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

/**
 * CREATE NOTE
 * @returns newly created note
 */
export type NoteInput = {
  title: string;
  text?: string;
};
export async function createNote(note: NoteInput): Promise<Note[]> {
  const res = await fetchData("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  return res.json();
}

/**
 * DELETE NOTE
 * @param note
 */
export async function deleteNote(noteID: string) {
  const res = await fetchData("/api/notes/" + noteID, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
  const res = await fetchData("api/notes/" + noteId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  return res.json();
}
