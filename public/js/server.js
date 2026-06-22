const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// 1. Подключаемся к локальной базе данных SQL прямо в папке js
const db = new sqlite3.Database(path.join(__dirname, 'menu.db'), (err) => {
    if (err) console.error('Ошибка SQL:', err.message);
    else console.log('Локальная база данных SQL (menu.db) успешно запущена!');
});

// 2. Создаем таблицу меню, если её еще нет, и наполняем тестовыми позициями
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        price TEXT NOT NULL
    )`);

    db.get("SELECT COUNT(*) as count FROM menu", [], (err, row) => {
        if (row && row.count === 0) {
            const insertStmt = db.prepare("INSERT INTO menu (title, category, price) VALUES (?, ?, ?)");
            insertStmt.run("Фирменный Бургер", "Бургеры", "450 ₽");
            insertStmt.run("Пиво Светлое", "Напитки", "300 ₽");
            insertStmt.run("Картофель Фри", "Закуски", "200 ₽");
            insertStmt.run("Пицца Пепперони", "Пицца", "650 ₽");
            insertStmt.run("Стейк из говядины", "Горячее", "890 ₽");
            insertStmt.run("Крафтовый Эль", "Напитки", "380 ₽");
            insertStmt.finalize();
            console.log('Тестовые карточки успешно записаны в таблицу SQL!');
        }
    });
});

// 3. ЖЕСТКАЯ НАСТРОЙКА ПУТЕЙ: заставляем сервер искать файлы везде
app.use(express.static(path.join(__dirname, '..'))); // Ищет в корне проекта (Васян сайт)
app.use(express.static(__dirname));                  // Ищет внутри папки js

// 4. Отдаем данные из SQL по запросу страницы
app.get('/api/menu', (req, res) => {
    // ДОБАВЛЕНО: Разрешаем любым портам и Live Server делать запросы к нашей базе данных
    res.setHeader('Access-Control-Allow-Origin', '*');

    db.all("SELECT title, category, price FROM menu", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows); 
    });
});

app.listen(PORT, () => {
    console.log(`Сервер работает! Ссылка для тестов: http://localhost:${PORT}/menu.html`);
});