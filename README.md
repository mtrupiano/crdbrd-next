# CRDBRD

Full stack web application for tracking Magic the Gathering collection
- PostgreSQL database
- Ktor API for credentials auth
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