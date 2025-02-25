# CRDBRD

Full stack web application for tracking Magic the Gathering collections
- PostgreSQL database
- Prisma ORM
- GraphQL API (Yoga Server, Pothos)
- NextJS front end

### Running local front end

`pnpm run dev`

[localhost:3000](localhost:3000)


### Database scripts
- Re-seed db: `npx prisma db seed`
- Run db migrations: `npx prisma migrate dev --name init`
- Run db migrations: `pnpm migrate-db --name init`
- Start db docker: `pnpm start-db`
- Stop db docker: `pnpm stop-db`
- Stop db and wipe data: `pnpm kill-db`
- Re-seed database (from 'src/lib/prisma/seed.ts'): `npx prisma db seed`
- Apply formatting to schema.prisma file: `npx prisma format`
