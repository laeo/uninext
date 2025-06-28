import { auth } from "@/lib/auth";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession(request)
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
    ],
} satisfies MiddlewareConfig;
