import React from "react";
import { Note } from "./NotesAPI";

interface SidebarProps {
  notes: Note[];
  onSelect: (id: number) => void;
  selectedNoteId: number | null;
  search: string;
  onSearch: (value: string) => void;
  onAdd: () => void;
}

/**
 * PUBLIC_INTERFACE
 * Sidebar with search, note list, and create button.
 */
export default function Sidebar({
  notes,
  onSelect,
  selectedNoteId,
  search,
  onSearch,
  onAdd,
}: SidebarProps) {
  return (
    <aside
      className="w-[260px] flex-shrink-0 min-h-screen border-r border-[var(--color-border)] bg-[var(--color-sidebar)] flex flex-col"
    >
      <div className="flex items-center justify-between py-4 px-4 border-b border-[var(--color-border)]">
        <span className="font-bold text-lg text-[var(--color-primary)] tracking-wide">
          Notes
        </span>
        <button
          className="bg-[var(--color-accent)] hover:bg-[var(--color-primary)] text-white rounded px-3 py-1 ml-2 text-sm font-medium"
          onClick={onAdd}
        >
          + New
        </button>
      </div>
      <div className="px-4 py-3">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          className="w-full px-2 py-1 rounded border outline-none focus:border-[var(--color-accent)]"
          style={{ borderColor: "var(--color-border)", fontSize: "1em" }}
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      <nav className="flex-1 overflow-y-auto px-1">
        {notes.length === 0 ? (
          <div className="text-gray-400 text-sm text-center mt-10">No notes</div>
        ) : (
          <ul>
            {notes.map(note => (
              <li
                key={note.id}
                className={`cursor-pointer px-4 py-2 rounded mb-1 select-none ${
                  selectedNoteId === note.id
                    ? "bg-[var(--color-primary)] text-white font-semibold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => onSelect(note.id)}
                title={note.title}
              >
                <span className="truncate block">{note.title || <em>(Untitled)</em>}</span>
              </li>
            ))}
          </ul>
        )}
      </nav>
      <div className="h-2" />
    </aside>
  );
}
