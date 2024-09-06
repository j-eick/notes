import styles from "./Note.module.css";
import styleUtils from "../../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../../models/note";
import { formatDate } from "../../utils/formatDate";
import { MdDelete } from "react-icons/md";

type NoteProps = {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  className: string;
  onDeleteNoteClicked: (note: NoteModel) => void;
};

export function Note({ note, onDeleteNoteClicked, onNoteClicked, className }: NoteProps) {
  const { title, text, createdAt, updatedAt } = note;

  return (
    <Card className={className} onClick={() => onNoteClicked(note)}>
      <Card.Body className={`${styles.card__body} ${className}`}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNoteClicked(note);
            }}
          />
        </Card.Title>
        <Card.Text className={styles.card__text}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className={styles.card__footer}>
        {createdAt ? formatDate(createdAt) : "no date availabe"}
      </Card.Footer>
    </Card>
  );
}
