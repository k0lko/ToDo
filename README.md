# TodoAPP

Aplikacja do zarządzania zadaniami, notatkami i kalendarzem, inspirowana Notion.

---

## Funkcjonalności

- Lista zadań (todo): dodawanie, edycja, usuwanie, oznaczanie wykonanych  
- Notatnik: wiele notatek, edycja, wyszukiwanie, lokalne zapisywanie  
- Kalendarz: dodawanie wydarzeń, zapisywane w localStorage  
- Kalkulator dostępny na każdej stronie  
- Ciemny motyw interfejsu  

---

## Technologie

- Frontend: React, TypeScript, Vite, SWC  
- Backend: Spring Boot (Java)  
- Baza danych: PostgreSQL  

---

## Uruchomienie

1. Sklonuj repozytorium:  
   `git clone https://github.com/k0lko/ToDo.git`

2. Backend:  
   - Przejdź do folderu `./zpo`  
   - Uruchom aplikację (np. `./mvnw spring-boot:run`)

3. Frontend:  
   - Przejdź do folderu `./zpo/todo-zpo`  
   - Zainstaluj zależności: `npm install`  
   - Uruchom serwer: `npm run dev`

4. Otwórz w przeglądarce adres podany przez Vite (domyślnie `http://localhost:5173`)

---

## Struktura projektu

- `backend` — Spring Boot API i logika serwera  
- `frontend` — aplikacja React + TS z widokami: Todo, Notes, Calendar, Calculator, Sidebar  
