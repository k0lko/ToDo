// src/components/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const { pathname } = useLocation();

    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li className={pathname === '/' ? 'active' : ''}>
                    <Link to="/">Zadania</Link>
                </li>
                <li className={pathname === '/calendar' ? 'active' : ''}>
                    <Link to="/calendar">Kalendarz</Link>
                </li>
                <li className={pathname === '/notes' ? 'active' : ''}>
                    <Link to="/notes">Notatki</Link>
                </li>
            </ul>
        </div>
    );
}
