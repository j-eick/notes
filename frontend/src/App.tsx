import styles from "./appStyles.module.css";
import styleUtils from "./styles/utils.module.css";
import { Note } from "./components/note";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { AddNote } from "./components/button/addNote";
import { useEffect, useState } from "react";
import AddEditNoteDialog from "./components/AddNoteDialog";
import { Note as NoteModel } from "./models/note";
import * as NotesApi from "../src/network/notes_api.ts";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>();
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  useEffect(() => {
    async function fetchNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (err) {
        console.error(err);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    fetchNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((targetnote) => targetnote._id !== note._id));
    } catch (err) {
      console.error(err);
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
      {notes.map((note: NoteModel) => (
        <Col key={note._id}>
          <Note note={note} onDeleteNoteClicked={deleteNote} className={styles.note} onNoteClicked={setNoteToEdit} />
        </Col>
      ))}
    </Row>
  );

  return (
    <main>
      <Container className={styles.notePage}>
        {notesLoading && <Spinner animation="border" variant="primary" />}
        {showNotesLoadingError && <p>Something went wrong. Pls refresh the page.</p>}
        {!notesLoading && !showNotesLoadingError && (
          <>{notes.length > 0 ? notesGrid : <p>You don't have any notes yet.</p>}</>
        )}
      </Container>
      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(notes.map((existingNote) => (existingNote._id === updatedNote._id ? updatedNote : existingNote)));
            setNoteToEdit(null);
          }}
        />
      )}
      <AddNote onClick={() => setShowAddNoteDialog(true)} className={styleUtils.flexCenter}>
        <FaPlus /> add note
      </AddNote>
    </main>
  );
}

export default App;
