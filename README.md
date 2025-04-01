# Ticketing Platform

This is a ticketing platform built with the [T3 Stack](https://create.t3.gg/).

## Technologies

- [Next.js](https://nextjs.org)
- [Drizzle](https://orm.drizzle.team)
- [Clerk](https://clerk.com)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Features

- Event creation and management
- Ticket purchasing and validation
- User authentication and profiles
- Image handling with Lorem Picsum

## Admin Permissions

To grant admin permissions to a user:

1. Go to the [Clerk Dashboard](https://dashboard.clerk.com/)
2. Navigate to the "Users" section
3. Click on the user you want to make an admin
4. Click on "Edit public metadata"
5. Add the following JSON:
```json
{
  "role": "admin"
}
```
6. Save the changes

## How to Run the Code

To run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The application can be deployed on [Vercel](https://vercel.com) or other platforms that support Next.js applications.
