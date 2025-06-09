# Recally - Flashcard Learning Platform

Recally is a modern flashcard learning platform built with Next.js, designed to help users create, manage, and study flashcards efficiently. The platform features a clean, intuitive interface and powerful organization tools to enhance your learning experience.

## Features

- Create and manage multiple flashcard decks
- Organize decks with tags and descriptions
- Grid and list view options for deck management
- Search and filter functionality
- Modern, responsive UI with dark mode support
- Local storage for offline access
- Progress tracking

## Tech Stack

- **Frontend Framework**: Next.js 15
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Database**: 
  - Local: Dexie.js (IndexedDB)
  - Server: PostgreSQL with Drizzle ORM
- **API**: tRPC
- **Authentication**: NextAuth.js
- **Package Manager**: pnpm

## Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (version 9.15.4 or later)
- PostgreSQL (for server-side database)

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd recally
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/recally"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Other environment variables as needed
   ```

4. Run database migrations:
   ```bash
   pnpm db:push
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm check` - Run Biome linter
- `pnpm db:generate` - Generate database migrations
- `pnpm db:push` - Push database changes
- `pnpm db:studio` - Open Drizzle Studio

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

### Milestones

## M1: Project Bootstrap 
- [x] Next.js project scaffolded with App Router
- [x] TailwindCSS, ESLint, Prettier configured
- [ ] Authentication with Clerk (Google)

## M2: Local-Only MVP 
- [ ] Deck and flashcard CRUD via UI and Dexie
    - [ ] CREATE
        - [x] CREATE decks
        - [ ] CREATE cards
    - [ ] READ 
        - [x] READ on decks details page
        - [ ] READ in study page
    - [ ] UPDATE
        - [ ] UPDATE decks
        - [ ] UPDATE cards
    - [ ] DELETE
        - [ ] DELETE decks
        - [ ] DELETE cards

- [ ] Abstract UI into shadcn components + use lucide react icons
    - [ ] app shell
    - [ ] homepage (buttons)
    - [ ] login page
    - [ ] decks page
    - [ ] deck detail page
    - [ ] dashboard
    - [ ] analytics
    - [ ] study page
- [ ] Leitner system integrated with review scheduling
- [ ] Review session flow complete
- [ ] Cards filterable by deck
- [ ] Search functionality
- [ ] Works fully offline

## M3: Backend + Sync Engine 
- [ ] PostgreSQL and Drizzle models created
- [ ] Sync API routes implemented
- [ ] Setup Redis KV
- [ ] Dexie sync replication connected to API
- [ ] Server-side conflict resolution tested

## M4: Offline UX + Stability 
- [ ] PWA setup with service worker
- [ ] Sync status indicators in UI
- [ ] Local-only changes auto-synced when online
- [ ] Error handling and fallback modes

## M5: Feature Polish
- [ ] Deck and card progress visualizations
- [ ] Review streaks and insights dashboard
- [ ] Dark mode support

![Hackatime Badge](https://hackatime-badge.hackclub.com/U08RN7971T6/recally?color=darkgreen)
