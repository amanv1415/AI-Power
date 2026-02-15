# AI Media Hub - Frontend

React + TypeScript + Tailwind CSS frontend for the AI-powered media platform.

## Features

- 📱 Responsive design for all devices
- 🎨 Clean and modern UI with Tailwind CSS
- 🤖 AI-powered recommendations
- 🔍 Advanced search and filtering
- 📊 Content analysis dashboard
- 🔐 User authentication

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/   # Reusable React components
├── pages/        # Page components
├── services/     # API services
├── store/        # Zustand state management
├── styles/       # Global styles
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

## Environment Variables

Create a `.env` file in the client directory:

```
VITE_API_URL=http://localhost:3000/api
```

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **Axios** - HTTP client
