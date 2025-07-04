import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import './Calendar.css';

interface Event {
    id: number;
    title: string;
    date: string; // YYYY-MM-DD
}

export default function CalendarPage() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/events')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(console.error);
    }, []);

    const handleDateClick = async (arg: any) => {
        const title = prompt('Wpisz nazwę wydarzenia:');
        if (!title) return;

        try {
            const response = await fetch('http://localhost:8080/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, date: arg.dateStr }),
            });
            if (!response.ok) throw new Error('Błąd zapisu eventu');

            const newEvent: Event = await response.json();
            setEvents([...events, newEvent]);
        } catch (err) {
            alert('Nie udało się dodać eventu');
            console.error(err);
        }
    };

    const handleEventRemove = async (eventId: number) => {
        if (!window.confirm('Usunąć to wydarzenie?')) return;
        try {
            const response = await fetch(`http://localhost:8080/api/events/${eventId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Błąd usuwania eventu');

            setEvents(events.filter(e => e.id !== eventId));
        } catch (err) {
            alert('Nie udało się usunąć eventu');
            console.error(err);
        }
    };

    // FullCalendar nie ma wbudowanego "usun" eventu, więc zróbmy to przez kliknięcie na event
    const handleEventClick = (clickInfo: any) => {
        const eventId = clickInfo.event.extendedProps.id || clickInfo.event.id;
        // Jeśli event ma id z backendu w extendedProps.id to bierzemy ten
        // Usuń event po kliknięciu
        handleEventRemove(Number(eventId));
    };

    // Mapuj eventy backendowe na format FullCalendar (id musi być string)
    const fcEvents = events.map(e => ({
        id: e.id.toString(),
        title: e.title,
        date: e.date,
        extendedProps: { id: e.id },
    }));

    return (
        <div className="calendar-page">
            <h1>Kalendarz</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                events={fcEvents}
                eventClick={handleEventClick}
                height="auto"
            />
            <p>Kliknij na wydarzenie, aby je usunąć.</p>
        </div>
    );
}
