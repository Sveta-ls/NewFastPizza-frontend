# NewFastPizza frontend

Готовая клиентская главная страница на React + TypeScript + Vite. Визуальная основа — предоставленные референсы NewFastPizza.

## Требования

- Node.js 18.18+
- npm

## Как запустить

1. Распакуйте архив `NewFastPizza-homepage.zip`.
2. Откройте папку `NewFastPizza-homepage` в VS Code.
3. Откройте терминал в этой папке.
4. Установите зависимости:

   ```bash
   npm install
   ```

5. Запустите dev-сервер:

   ```bash
   npm run dev
   ```

6. Перейдите по адресу, который появится в терминале.

## Проверка production-сборки

```bash
npm run build
npm run preview
```

## Структура

```text
NewFastPizza-homepage/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── src/
    ├── assets/
    │   ├── pizza-margherita.jpg
    │   ├── pizza-pepperoni.jpg
    │   ├── pizza-four-cheese.jpg
    │   └── pizza-ham-mushroom.jpg
    ├── App.tsx
    ├── main.tsx
    └── styles.css
```
