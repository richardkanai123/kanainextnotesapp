# Note-Taking App

## Overview
A modern note-taking web application built with Next.js 15, offering a clean and intuitive interface for managing personal notes.

### Tech Stack
- **Next.js 15**: React framework with App Router
- **MongoDB**: Database storage
- **Clerk**: Authentication
- **ShadcnUI**: Component library
- **TailwindCSS**: Styling
- **Prisma**: ORM

## Features

### Core Functionality
- Create, edit, and delete notes
- Rich text editing with TipTap
- Categorize notes with labels
- Pin important notes
- Real-time search and filtering
- Share notes with others
- Comment on notes

### User Experience
- Responsive design for all devices
- Dark/Light theme support
- Modern animations and transitions
- Intuitive navigation

### Security
- Clerk authentication
- Protected routes
- Secure data handling

## Getting Started

1. **Clone and Install**:
   ```bash
   git clone https://github.com/richardkanai123/kanainextnotesapp.git
   cd kanainextnotesapp
   npm install
   ```

2. **Environment Setup**:
   ```env
   DATABASE_URL=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

## Project Structure
```
src/
├── app/             # App router pages
├── components/      # UI components
├── lib/            # Utilities
└── styles/         # Global styles
```

## Contributing
Contributions are welcome! Please read our contributing guidelines.

## License
MIT License

## Contact
Richard Kanai - [GitHub](https://github.com/richardkanai123)
