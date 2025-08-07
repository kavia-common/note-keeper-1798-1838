import React from "react";
import { Note } from "./NotesAPI";

interface NoteViewerProps {
  note: Note | null;
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * PUBLIC_INTERFACE
 * Main note viewer: presents note details and actions.
 */
export default function NoteViewer({ note, onEdit, onDelete }: NoteViewerProps) {
  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 select-none">
        <span className="text-lg mb-2">No note selected</span>
        <span className="text-sm text-gray-300">Select or create a note to get started.</span>
      </div>
    );
  }
  return (
    <article className="w-full max-w-2xl px-5 py-9 mx-auto">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-xl font-bold text-[var(--color-primary)] break-words">
          {note.title || <em>(Untitled)</em>}
        </h1>
        <span className="text-xs text-gray-400">
          Created: {new Date(note.created_at).toLocaleString()} &mdash; Updated: {new Date(note.updated_at).toLocaleString()}
        </span>
      </div>
      <div className="whitespace-pre-line text-base text-gray-800 min-h-[48px]">
        {note.content}
      </div>
      <div className="flex mt-8 gap-2">
        <button
          className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white px-4 py-2 rounded"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="border border-[var(--color-border)] bg-white hover:bg-gray-100 text-[var(--color-secondary)] px-4 py-2 rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
