"use server"

import { lucia } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { LoginForm, LoginFormType, RegistrationForm, RegistrationFormType, UpdateProfileFormType } from "@/lib/schema";
import { validateRequest } from "@/lib/validate-user";
import { Scrypt } from "lucia";
import { cookies } from "next/headers";
import { saveImage } from "./products";
import { deleteImage } from "./utils";

export async function registerUser(_: any, data: RegistrationFormType): Promise<{ error?: string, success?: string }> {
    try {
        const parsed = RegistrationForm.safeParse(data);
        if (!parsed.success) {  
            return { error: "Invalid form data" };
        }
        const { userName, email, password } = data;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: userName }, { email }]
      },
      select: {
        id: true
      }
    });
    console.log('Existing User:', existingUser);

    if (existingUser) {
      return { error: 'User already exists' };
    }

    // Hash Password
    const hashedPassword = await new Scrypt().hash(password);

    // Create User
    const user = await prisma.user.create({
      data: {
        username: userName,
        email,
        password: hashedPassword,
        role: 'buyer',
      }
    });
    console.log('User created:', user);
    console.log(user)
    // Create Session (NO EXTRA ATTRIBUTES)
    const session = await lucia.createSession(user.id, {});
    console.log('Session created:', session);
    // // Create Session Cookie
    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookie = await cookies()
    cookie.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )
    return { success: 'User Created Successfully' };
    } catch (error: any) {
        console.error('Registration error:', error);
            return { error: error?.message };
    }
}

export async function loginUser(_: any, data: LoginFormType): Promise<{ error?: string, success?: string }> {
    try {
        const parsed = LoginForm.safeParse(data);
        if (!parsed.success) {  
            return { error: "Invalid form data" };
        }
        const { email, password } = data;


    const user = await prisma.user.findUnique({
      where: {
        email 
      },
    });

    if (!user) {
      return { error: 'Invalid Email or Password' };
    }
    const isValid = await new Scrypt().verify(password,user.password)
  
    if (isValid) {
      return { error: 'Invalid Email or Password' };
    }
    // Create Session (NO EXTRA ATTRIBUTES)
    const session = await lucia.createSession(user.id, {});
    // // Create Session Cookie
    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookie = await cookies()
    cookie.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )
    return { success: 'User has been Logged in Successfully' };
    } catch (error: any) {
        console.error('Login error:', error);
            return { error: error?.message };
    }
}



export async function updateUserProfile(
  _: any,
  data: UpdateProfileFormType
): Promise<{ error?: string; success?: string }> {
  try {
    const { user } = await validateRequest();

    if (!user) return { error: "Unauthorized" };
    const oldImageUrl = await prisma.user.findUnique({
      where: { id: user.id }
    })
    const { userName: username, bio, avatarUrl } = data;

    let imageUrl: string | undefined;

    if (avatarUrl) {
      // Ensure saveImage is awaited (if it's async)
      imageUrl = await saveImage(avatarUrl, "uploads");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        username,
        bio,
        ...(imageUrl ? { avatarUrl: imageUrl } : {}),
      },
    });

    if (oldImageUrl?.avatarUrl) {
      await deleteImage(oldImageUrl.avatarUrl)
    }

    return { success: "Profile updated successfully" };
  } catch (error: any) {
    console.error("Profile Update Error:", error);
    return { error: error?.message ?? "Something went wrong" };
  }
}
