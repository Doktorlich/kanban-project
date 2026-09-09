import { NextRequest, NextResponse } from "next/server";

const PUBLIC_AUTH_PATHS = ["/login", "/register"];
export function proxy(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const isAuthPath = PUBLIC_AUTH_PATHS.includes(request.nextUrl.pathname);

    if (!accessToken && !isAuthPath) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (accessToken && isAuthPath) {
        return NextResponse.redirect(new URL("/workspaces", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/workspaces/:path*", "/login", "/register"],
};
