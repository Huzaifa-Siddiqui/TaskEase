import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = (req as any).nextauth?.token;

    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (token.role === "admin" && !req.nextUrl.pathname.startsWith("/admin-dashboard")) {
      return NextResponse.redirect(new URL("/admin-dashboard", req.url));
    }

    if (token.role !== "admin" && req.nextUrl.pathname.startsWith("/admin-dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/signin",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};
