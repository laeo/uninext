import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, bearer } from "better-auth/plugins";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'sqlite',
        usePlural: true,
    }),
    trustedOrigins: (req) => [req.headers.get('origin') ?? process.env.BETTER_AUTH_URL ?? ''],
    plugins: [
        admin(),
        bearer(),
    ],
    emailAndPassword: {
        enabled: true,
    },
})