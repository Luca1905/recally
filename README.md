### Milestones

## M1: Project Bootstrap 
- [x] Next.js project scaffolded with App Router
- [x] TailwindCSS, ESLint, Prettier configured
- [ ] Authentication with Clerk (Google)

## M2: Local-Only MVP 
- [ ] Deck and flashcard CRUD via UI and Dexie
    - [ ] CREATE
        - [ ] CREATE decks
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

- [ ] Leitner system integrated with review scheduling
- [ ] Review session flow complete
- [ ] Cards filterable by deck
- [ ] Search functionality
- [ ] Works fully offline

## M3: Backend + Sync Engine 
- [ ] PostgreSQL and Drizzle models created
- [ ] Sync API routes implemented
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

