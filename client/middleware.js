"use server"
import { NextResponse } from 'next/server';
import { updateSession } from 'lib';

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const staticAssetPattern = /^\/_next\/static|^\/images|^\/favicon.ico|^\/fonts/;

    if (staticAssetPattern.test(pathname)) {
        return NextResponse.next();
    }

    if (pathname !== "/authentication/sign-in") {
        return updateSession(request);
    }

    return NextResponse.next();
}
