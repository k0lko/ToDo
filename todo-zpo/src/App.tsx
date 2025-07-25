(window as any).global = window;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Calculator from "./components/Calculator";
import TodoPage from "./pages/TodoPage";
import Notes from "./pages/Notes";
import Calendar from "./pages/Calendar";
import "./App.css";

export default function App() {
    return (
        <Router>
            <div className="notion-app">
                <Sidebar />
                <main className="main-content">
                    <Calculator />
                    <div>TEST STRONY GŁÓWNEJ</div>
                    <Routes>
                        <Route path="/" element={<TodoPage />} />
                        <Route path="/notes" element={<Notes />} />
                        <Route path="/calendar" element={<Calendar />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
