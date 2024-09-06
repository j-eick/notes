import { ReactNode } from "react";
import styles from "./addNote.module.css";

type AddNoteProps = {
  children: ReactNode;
  className: string;
  onClick: () => void;
};

export function AddNoteButton({ children, onClick, className }: AddNoteProps) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
