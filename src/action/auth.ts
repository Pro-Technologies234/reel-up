"use server";

import { auth } from "@/lib/auth"; // Your Better Auth instance
import {
  LoginForm,
  LoginFormType,
  RegistrationForm,
  RegistrationFormType,
  UpdateProfileFormType,
} from "@/lib/schema";
import { validateRequest } from "@/lib/validate-user";
import { headers } from "next/headers";
import { saveImage } from "./products";
import { prisma } from "@/lib/prisma";

export async function registerUser(
  _: any,
  data: RegistrationFormType,
): Promise<{ error?: string; success?: string }> {
  try {
    const parsed = RegistrationForm.safeParse(data);
    if (!parsed.success) {
      return { error: "Invalid form data" };
    }
    const { userName, email, password } = data;
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: userName,
        username: userName,
      },
      headers: await headers(),
    });

    return { success: "User Created Successfully" };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { error: error?.message || "Registration failed" };
  }
}

export async function loginUser(
  _: any,
  data: LoginFormType,
): Promise<{ error?: string; success?: string }> {
  try {
    const parsed = LoginForm.safeParse(data);
    if (!parsed.success) {
      return { error: "Invalid form data" };
    }
    const { email, password } = data;

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    return { success: "User has been Logged in Successfully" };
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: "Invalid Email or Password" };
  }
}

export async function updateUserProfile(
  _: any,
  data: UpdateProfileFormType,
): Promise<{ error?: string; success?: string }> {
  try {
    // This now uses your updated Better Auth validateRequest
    const { user } = await validateRequest();

    if (!user) return { error: "Unauthorized" };

    const oldUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    const { userName: username, bio, avatarUrl } = data;

    let imageUrl: string | undefined;
    if (avatarUrl) {
      imageUrl = await saveImage(avatarUrl, "uploads");
    }

    // Update the user record
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: username, // Updated to match Better Auth's 'name' field
        bio,
        ...(imageUrl ? { image: imageUrl } : {}), // Better Auth uses 'image' by default
      },
    });

    // if (oldUser?.image && imageUrl) {
    //   await deleteImage(oldUser.image);
    // }

    return { success: "Profile updated successfully" };
  } catch (error: any) {
    console.error("Profile Update Error:", error);
    return { error: error?.message ?? "Something went wrong" };
  }
}
