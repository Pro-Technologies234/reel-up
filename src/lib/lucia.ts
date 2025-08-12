import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { User, Session, PrismaClient } from "@/lib/prisma";
const client = new PrismaClient();
const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "session",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production"
    }
  },
  getUserAttributes: (user) => ({
    username: user.username,
    email: user.email,
  })
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes; 
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes extends Omit<User, "password"> {}