# Song List Viewer

[Live Page](https://eras-tour-acoustic-set.vercel.app/)

## Description

This project is a Next.js application that displays every song Taylor has performed on the Acoustic Set on Eras Tour as a sortable table. It's built using Next.js 13+ with the App Router, TypeScript, and Tailwind CSS. The application allows users to view a list of the songs with details such as title, date performed, location, featured with, and a link to the video on YouTube.

I decided to create this page after losing track of all the songs that have been performed so far and not having a visual cronological display with video sources available.

## Screenshot

![desktop-preview](/)

## Features

- Responsive table layout
- Sorting functionality (currently by date performed)
- Client-side interactivity with server-side rendering
- TypeScript for type safety
- Tailwind CSS for styling

## Project Structure
```
my-song-list-app/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── SongsArray.ts
│
├── components/
│   └── SongTable.tsx
│
├── public/
│   └── (static files)
│
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.