# CRDBRD

Full stack web application for tracking Magic the Gathering collections
- PostgreSQL database
- Prisma ORM
- GraphQL API (Yoga Server, Pothos Schema builder, Apollo Client)
- NextJS + React front end

### Run local front end
`pnpm dev`

[localhost:3000](http://localhost:3000)

### Compile GraphQL types
`pnpm compile-graphql`

`pnpm watch-graphql`


### Database scripts
- Run db migrations: `npx prisma migrate dev --name init`
- Run db migrations: `pnpm migrate-db --name init`
- Start db docker: `pnpm start-db`
- Stop db docker: `pnpm stop-db`
- Stop db and wipe data: `pnpm kill-db`
- Re-seed database (from 'src/lib/prisma/seed.ts'): `npx prisma db seed`
- Apply formatting to schema.prisma file: `npx prisma format`
