# Note-Taking App

## Overview
This is a modern note-taking web application built using the following technologies:

- **Next.js**: Framework for building the React-based front end.
- **Prisma**: ORM for interacting with the MongoDB database.
- **Clerk**: Authentication and user management.
- **MongoDB**: Database for storing notes and user data.

The app allows users to:
- Create, update, delete, and manage notes.
- Organize notes by category.
- Search and filter notes by title and category.
- Pin important notes for easy access.
- Share notes with others via links or email.

---

## Features

### Notes
- Each note contains the following:
  - **Title**: A short description of the note.
  - **Content**: Rich text (HTML).
  - **Pinned**: A boolean value to mark important notes.
  - **Category**: Classifies the note (e.g., Work, Personal).
  - **Dates**: Automatically records creation and update timestamps.

### Categories
- Notes can be classified into 15 categories, such as Personal, Work, Study, and more.
- Each category is represented by a name, details, and an emoji for better user experience.

### Authentication
- Uses Clerk for seamless user authentication.
- Supports secure sign-up, login, and user session management.

### Search and Filtering
- Users can search notes by title.
- Notes can be filtered by category or viewed as a complete list.

### Sharing
- Users can share notes with others via unique links or email invitations.

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/richardkanai123/kanainextnotesapp.git
   cd note-taking-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory with the following:
   ```env
   DATABASE_URL="your-mongodb-connection-string"
   NEXT_PUBLIC_CLERK_FRONTEND_API="your-clerk-frontend-api"
   CLERK_API_KEY="your-clerk-api-key"
   ```

4. **Run Prisma Migrations**:
   ```bash
   npx prisma migrate dev
   ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

---

## Project Structure

```
.
├── prisma/                 # Prisma schema and migrations
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Next.js pages
│   ├── lib/               # Utility functions and helpers
│   ├── styles/            # Global and component-specific styles
│   └── types/             # TypeScript types
├── .env                   # Environment variables
├── package.json           # Node.js dependencies
└── README.md              # Project documentation
```


---

## Future Enhancements
- **Version History**: Track changes made to notes.
- **Collaborative Editing**: Allow multiple users to edit notes in real time.
- **Offline Mode**: Enable note access and updates without an internet connection.
- **Advanced Search**: Search notes using multiple criteria, such as date or tags.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments
Special thanks to:
- ShadCN/UI for providing beautiful and flexible UI components.
- The open-source community for providing excellent tools and libraries.
- Clerk for simplifying authentication.
- Prisma for making database interactions intuitive.

