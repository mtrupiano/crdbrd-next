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