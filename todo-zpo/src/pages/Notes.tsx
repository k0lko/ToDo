import { useEffect, useState } from 'react';
import './Notes.css';

interface Note {
    id: number;
    content: string;
}

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingContent, setEditingContent] = useState('');

    // Pobierz notatki z backendu
    useEffect(() => {
        fetch('http://localhost:8080/api/notes')
            .then(res => res.json())
            .then(setNotes)
            .catch(console.error);
    }, []);

    // Dodaj nową notatkę
    const addNote = async () => {
        if (!newNote.trim()) return;
        try {
            const res = await fetch('http://localhost:8080/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newNote }),
            });
            const created = await res.json();
            setNotes([created, ...notes]);
            setNewNote('');
        } catch (err) {
            alert('Błąd dodawania notatki');
            console.error(err);
        }
    };

    // Usuń notatkę
    const deleteNote = async (id: number) => {
        if (!window.confirm('Usunąć notatkę?')) return;
        try {
            await fetch(`http://localhost:8080/api/notes/${id}`, { method: 'DELETE' });
            setNotes(notes.filter(n => n.id !== id));
        } catch (err) {
            alert('Błąd usuwania notatki');
            console.error(err);
        }
    };

    // Zacznij edytować notatkę
    const startEdit = (note: Note) => {
        setEditingId(note.id);
        setEditingContent(note.content);
    };

    // Anuluj edycję
    const cancelEdit = () => {
        setEditingId(null);
        setEditingContent('');
    };

    // Zapisz edycję
    const saveEdit = async () => {
        if (!editingContent.trim() || editingId === null) return;
        try {
            const res = await fetch(`http://localhost:8080/api/notes/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: editingContent }),
            });
            const updated = await res.json();
            setNotes(notes.map(n => (n.id === editingId ? updated : n)));
            cancelEdit();
        } catch (err) {
            alert('Błąd zapisu notatki');
            console.error(err);
        }
    };

    return (
        <div className="notes-page">
            <h1>Notatki</h1>
            <div className="add-note">
        <textarea
            placeholder="Nowa notatka..."
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            rows={3}
        />
                <button onClick={addNote}>Dodaj</button>
            </div>

            <ul className="notes-list">
                {notes.map(note => (
                    <li key={note.id} className="note-item">
                        {editingId === note.id ? (
                            <>
                <textarea
                    value={editingContent}
                    onChange={e => setEditingContent(e.target.value)}
                    rows={3}
                />
                                <button onClick={saveEdit}>Zapisz</button>
                                <button onClick={cancelEdit}>Anuluj</button>
                            </>
                        ) : (
                            <>
                                <p>{note.content}</p>
                                <button onClick={() => startEdit(note)}>Edytuj</button>
                                <button onClick={() => deleteNote(note.id)}>Usuń</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
