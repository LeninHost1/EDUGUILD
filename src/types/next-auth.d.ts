import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      code: string;
      collegeId: string;
      name?: string | null;
      email?: string | null;
    };
  }
}

