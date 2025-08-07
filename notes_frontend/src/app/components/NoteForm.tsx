import React, { useState } from "react";
import { Note } from "./NotesAPI";

interface NoteFormProps {
  initial?: Partial<Note>;
  onSave: (data: { title: string; content: string }) => void;
  onCancel: () => void;
  loading?: boolean;
  submitLabel?: string;
}

/**
 * PUBLIC_INTERFACE
 * NoteForm - for new/edit note modals.
 */
export default function NoteForm({
  initial = {},
  onSave,
  onCancel,
  loading,
  submitLabel = "Save",
}: NoteFormProps) {
  const [title, setTitle] = useState(initial.title || "");
  const [content, setContent] = useState(initial.content || "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setError(null);
    onSave({ title: title.trim(), content });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        autoFocus
        type="text"
        placeholder="Title"
        className="border rounded px-3 py-2 focus:outline-none focus:border-[var(--color-accent)]"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ borderColor: "var(--color-border)" }}
        maxLength={120}
      />
      <textarea
        placeholder="Content"
        className="border rounded px-3 py-2 min-h-[70px] resize-vertical focus:outline-none focus:border-[var(--color-accent)]"
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ borderColor: "var(--color-border)" }}
        maxLength={4000}
        rows={5}
      />
      {error && <div className="text-red-500 text-xs">{error}</div>}
      <div className="mt-2 flex gap-2 justify-end">
        <button
          type="button"
          className="border bg-white px-3 py-2 rounded text-[var(--color-secondary)] border-[var(--color-border)] hover:bg-gray-100"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] px-4 py-2 rounded text-white transition-colors disabled:opacity-70"
          style={{ minWidth: 80 }}
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
