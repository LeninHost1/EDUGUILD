import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/college/:path*",
    "/department/:path*",
    "/committee/:path*",
    "/resources/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/messages/:path*",
    "/notifications/:path*"
  ]
};

