"use server"
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validate-user";
import { mkdir } from "fs/promises";
import { writeFile } from 'fs/promises';
import path from 'path';

import { CreateReelForm } from "@/lib/schema";
import { deleteVideo } from "./utils";

export async function createReel(_: any, data: { name: string; caption: string; video: string }): 
Promise<{ error?: string; success?: string }> {
    try {
        const parsed = CreateReelForm.safeParse(data);
        if (!parsed.success) {
            return { error: "Invalid product data" };
        }

        const { name, caption, video } = data;

        const { user } = await validateRequest();
        if (!user) {
            return { error: "Unauthorized" };
        }

        // Create Product First
        const reel = await prisma.reel.create({
            data: {
                name: name,
                caption: caption,
                createdById: user.id,
                url: ''
            }
        });

        // Save Images Locally and in DB with SourceType
        const base64Data = video.replace(/^data:video\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        const fileName = `${reel.id}-${reel.name}.mp4`;
        const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        // Ensure the uploads directory exists
        await mkdir(uploadsDir, { recursive: true });
        await writeFile(filePath, buffer);

        // Save Image with SourceType & sourceId in DB
        await prisma.reel.update({
            where: {
                id: reel.id
            },
            data: {
                url: `uploads/${fileName}`
            }
        })

        return { success: "Your Reel has been Created Successfully" };
        
    } catch (error: any) {
        console.error("Product creation error:", error);
        return { error: error?.message || "Unknown error occurred" };
    }
}


export async function fetchReels(search?: string) {
    try {

        const reels = await prisma.reel.findMany({
            where: {
                ...(search && { caption: {contains: search} })
            },
            include: {
                likes: true,
                createdBy: true,
            }
        })
        return reels 

    } catch {
         console.log('Unable to fetch reels.')
         return []
    }
}


export type Reels = Awaited<ReturnType<typeof fetchReels>>


export async function likeReel(reelId: string) {
    try {

        const { user } = await validateRequest()

        if (!user) {
            return { error: 'Unauthorize' }
        }
        

        console.log('Reel ID', reelId)
        const existingLike = await prisma.like.findFirst({
            where: {
                userId: user.id,
                reelId: reelId,
            }
        })
        if(existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            })
            return { liked: false }
        } else {
            await prisma.like.create({
                data: {
                    userId: user.id,
                    reelId: reelId,
                }
            })
            return { liked: true }
        }
    } catch(error: any) {
        console.log(error.message)
        return { error: 'Something went wrong' }
    }
}


export async function deleteReel(reelId: string) {
    try {

        const deletedReel = await prisma.reel.delete({
            where: {
                id: reelId
            }
        })

        deleteVideo(deletedReel.url)
        return { success: 'Reel Deleted Successfully' }

    } catch(error: any) {
        return { error: 'Something went wrong' }
    }
}
