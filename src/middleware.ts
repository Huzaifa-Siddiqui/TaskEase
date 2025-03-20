import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = (req as any).nextauth?.token; // Temporary workaround for type error

    // If no token, redirect to sign-in page
    if (!token) {
      if (!req.nextUrl.pathname.startsWith("/signin")) {
        return NextResponse.redirect(new URL("/signin", req.url));
      }
      return NextResponse.next();
    }

    const userId: string | undefined = token?.sub; // NextAuth stores user ID in `sub`

    // Redirect admin to admin dashboard
    if (userId === "3ed0bcf7-dc8b-4022-9295-d21bbc14aa1c" && !req.nextUrl.pathname.startsWith("/admin-dashboard")) {
      return NextResponse.redirect(new URL("/admin-dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/signin",
    },
  }
);

// Apply middleware to only these routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"], // Protect specific routes
};
