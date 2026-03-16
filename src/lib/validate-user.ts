"use server";
import { cache } from "react";
import { auth } from "@/lib/auth"; // Your Better Auth instance
import { headers } from "next/headers";

export const uncachedValidateRequest = async () => {
  // Better Auth needs the headers to extract the session cookie
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { user: null, session: null };
  }

  return {
    user: session.user,
    session: session.session,
  };
};

export const validateRequest = cache(uncachedValidateRequest);
