"use server"
import { promises as fs } from "fs";
import path from "path";

export async function uploadImage(file: File): Promise<string | null> {
  if (!file) return null;

  if (file.size > 5 * 1024 * 1024) {
    // toast.error("File size must be under 5MB");
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const { url } = (await res.json()) as { url: string };
    return url;
  } catch (error) {
    // toast.error("Failed to upload image");
    return null;
  }
}


export async function deleteImage(url: string): Promise<{ success?: string; error?: string }> {
  try {
    let relativePath: string;
    if (url.startsWith("http")) {
      relativePath = new URL(url).pathname;
    } else {
      relativePath = url;
    }

    const filePath = path.join(process.cwd(), "public", relativePath);
    await fs.unlink(filePath);

    return { success: "Image deleted successfully" };
  } catch (error: any) {
    console.error("Failed to delete image:", error);
    return { error: error?.message ?? "Failed to delete image" };
  }
}


export async function deleteVideo(url: string): Promise<{ success?: string; error?: string }> {
  try {
    let relativePath: string;
    if (url.startsWith("http")) {
      relativePath = new URL(url).pathname;
    } else {
      relativePath = url;
    }

    const filePath = path.join(process.cwd(), "public", relativePath);
    await fs.unlink(filePath);

    return { success: "Video deleted successfully" };
  } catch (error: any) {
    console.error("Failed to delete Video:", error);
    return { error: error?.message ?? "Failed to delete video" };
  }
}