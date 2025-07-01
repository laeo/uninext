import { getSessionCookie } from "better-auth/cookies";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
}

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api')) {
        // Check the origin from the request
        const origin = request.headers.get('origin') ?? '';

        // Handle preflighted requests
        const isPreflight = request.method === 'OPTIONS';

        if (isPreflight) {
            const preflightHeaders = {
                'Access-Control-Allow-Origin': origin,
                ...corsOptions,
            };
            return NextResponse.json({}, { headers: preflightHeaders });
        }

        // Handle simple requests
        const response = NextResponse.next();
        response.headers.set('Access-Control-Allow-Origin', origin);

        Object.entries(corsOptions).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;
    }

    const session = getSessionCookie(request);
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
} satisfies MiddlewareConfig;
