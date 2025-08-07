"use client";

import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import NoteViewer from "./components/NoteViewer";
import Modal from "./components/Modal";
import NoteForm from "./components/NoteForm";
import {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
  Note,
} from "./components/NotesAPI";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Modal management
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [loading, setLoading] = useState(false);

  // Notification
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load all notes (optionally filtered)
  const loadNotes = useCallback(async () => {
    setNotes(await fetchNotes(search));
  }, [search]);

  // Load selected note whenever ID changes
  useEffect(() => {
    if (selectedNoteId != null) {
      fetchNote(selectedNoteId).then(setSelectedNote);
    } else {
      setSelectedNote(null);
    }
  }, [selectedNoteId]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Clear selection if search result doesn't contain selected note
  useEffect(() => {
    if (
      selectedNoteId != null &&
      !notes.some((n) => n.id === selectedNoteId)
    ) {
      setSelectedNoteId(null);
    }
  }, [notes, selectedNoteId]);

  // --- Note CRUD ---
  async function handleCreate(data: { title: string; content: string }) {
    setLoading(true);
    const created = await createNote(data);
    setLoading(false);
    if (!created) {
      setErrorMsg("Failed to create note.");
      return;
    }
    setShowModal(false);
    setNotes(await fetchNotes(search));
    setSelectedNoteId(created.id);
  }

  async function handleEdit(data: { title: string; content: string }) {
    if (!selectedNoteId) return;
    setLoading(true);
    const updated = await updateNote(selectedNoteId, data);
    setLoading(false);
    if (!updated) {
      setErrorMsg("Failed to update note.");
      return;
    }
    setShowModal(false);
    setNotes(await fetchNotes(search));
    setSelectedNoteId(updated.id);
  }

  async function handleDelete() {
    if (!selectedNoteId) return;
    if (!confirm("Delete this note? This cannot be undone.")) return;
    const ok = await deleteNote(selectedNoteId);
    if (!ok) {
      setErrorMsg("Delete failed.");
    } else {
      setNotes(await fetchNotes(search));
      setSelectedNoteId(null);
    }
  }

  function openCreateModal() {
    setModalMode("create");
    setShowModal(true);
  }
  function openEditModal() {
    setModalMode("edit");
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setLoading(false);
    setErrorMsg(null);
  }

  function handleSelectNote(id: number) {
    setSelectedNoteId(id);
  }

  // Responsive: sidebar collapses below sm
  return (
    <main className="min-h-screen bg-white flex flex-row">
      <Sidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelect={handleSelectNote}
        search={search}
        onSearch={setSearch}
        onAdd={openCreateModal}
      />
      <section className="flex-1 min-h-screen flex flex-col relative bg-white overflow-hidden">
        <div className="flex-1 flex flex-col justify-stretch items-center">
          <div className="w-full flex-1 flex items-center justify-center">
            <div className="w-full">
              <NoteViewer
                note={selectedNote}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </section>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        title={modalMode === "create" ? "Create Note" : "Edit Note"}
      >
        <NoteForm
          key={modalMode + (selectedNote?.id ?? "")}
          initial={modalMode === "edit" ? selectedNote ?? undefined : undefined}
          onSave={modalMode === "create" ? handleCreate : handleEdit}
          onCancel={handleCloseModal}
          loading={loading}
          submitLabel={modalMode === "create" ? "Create" : "Save"}
        />
        {errorMsg && (
          <div className="mt-2 text-red-500 text-center text-xs">{errorMsg}</div>
        )}
      </Modal>
    </main>
  );
}
