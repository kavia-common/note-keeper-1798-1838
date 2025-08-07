'use client'

// PUBLIC_INTERFACE
export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const API_URL = "http://localhost:3001/notes";

/**
 * Utility: Fetch all notes, with optional search.
 * @param search string to filter notes by title or content
 */
export async function fetchNotes(search?: string): Promise<Note[]> {
  try {
    let url = API_URL;
    if (search) {
      url += "?q=" + encodeURIComponent(search);
    }
    const resp = await fetch(url, { cache: "no-store" });
    if (!resp.ok) throw new Error("Failed to fetch notes");
    return await resp.json();
  } catch {
    return [];
  }
}

/**
 * Utility: Fetch one note by ID.
 */
export async function fetchNote(id: number): Promise<Note | null> {
  try {
    const resp = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
    if (!resp.ok) return null;
    return await resp.json();
  } catch {
    return null;
  }
}

/**
 * Utility: Create a new note.
 */
export async function createNote(data: { title: string; content: string }): Promise<Note | null> {
  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!resp.ok) return null;
    return await resp.json();
  } catch {
    return null;
  }
}

/**
 * Utility: Update a note by ID.
 */
export async function updateNote(
  id: number,
  data: { title?: string; content?: string }
): Promise<Note | null> {
  try {
    const resp = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!resp.ok) return null;
    return await resp.json();
  } catch {
    return null;
  }
}

/**
 * Utility: Delete a note by ID.
 */
export async function deleteNote(id: number): Promise<boolean> {
  try {
    const resp = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return resp.ok;
  } catch {
    return false;
  }
}
