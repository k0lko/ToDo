import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Moje Zakładki</h2>
            <nav>
                <ul>
                    <li><Link to="/">📋 Zadania</Link></li>
                    <li><Link to="/notes">📝 Notatki</Link></li>
                    <li><Link to="/calendar">📅 Kalendarz</Link></li>
                </ul>
            </nav>
        </aside>
    );
}
