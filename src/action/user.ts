"use server"
import prisma, { User } from "@/lib/prisma";
import { BecomeSellerForm, BecomeSellerFormType } from "@/lib/schema";
import { validateRequest } from "@/lib/validate-user";
import { CatalystPipelineStrategy } from "livepeer/models/components";

export async function getUser(userId: string) {

    try {
        const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
        
        if (!user) {
            return { error: 'User does not exist' }
        }

        return { user }

    } catch(error: any) {
        console.log('Unable to get user', error)
        return { error: error?.message || 'Unable to get user' }
    }

}


export async function follow(followingUserId: string) {
    try {
        const { user } = await validateRequest()

        if (!user) {
            return { error: 'Unauthorized' }
        }

        const alreadyFollow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: user.id,
                    followingId: followingUserId
                }
            }
        })

        if(alreadyFollow) {
            await prisma.follow.delete({
                where : {
                    id: alreadyFollow.id
                }
            })

            return {succes: 'You unfollowed this user'}
        } else {
            await prisma.follow.create({
                data: {
                    followerId: user.id,
                    followingId: followingUserId,
                }
            })
            return { success: 'You followed this user' }
        }


    } catch (error: any) {
        console.log(error?.message || 'Something went wrong')
        return { error:  error?.message || 'Something went wrong' }
    }
}

export async function checkFollowing (creatorId: string) {
    try {

         const { user } = await validateRequest()

         if (!user) {
            return {}
         }

        const followingUser = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: user.id,
                    followingId: creatorId,
                }
            }
        })

        if (followingUser) {
            return { isFollowing: true }
        }
        return { isFollowing: false }


    } catch {
        return {}
    }
}


export async function getSellers() {
    try {

        const sellers = await prisma.user.findMany({
            where : {
                isSeller: true
            }
        })
        return sellers

    } catch {
        return []
    }
}


export async function becomeSeller(_:any, data: BecomeSellerFormType): Promise<{success?: string, error?: string}> {
    try {

        const { user } = await validateRequest()
        if (!user) {
            return { error: 'Unauthorized' }
        }
        const parsed = BecomeSellerForm.safeParse(data)

        if (!parsed.success) {
            return { error: 'Invalid Form Data'}
        }

        const { 
                bussinessName, 
                bussinessEmail, 
                phoneNumber, 
                bussinessType, 
                bussinessRegistrationNumber, 
                bussinessAddress, 
                bussinessCategory,
                terms
            } = data;


        console.log(bussinessCategory)
        
        await prisma.user.update({
            where: {
                id: user?.id
            },
            data: {
                bussinessName,
                bussinessEmail,
                phoneNumber,
                bussinessAddress,
                bussinessRegistrationNumber,
                bussinessType,
                ...(bussinessCategory && {
                    bussinessCategory: {
                        connect: bussinessCategory.map((name) => ({ name })),
                    },
                }),
                terms
            }
        })
        return { success: 'You are seller account request is under verification.' }

    } catch(error: any) {
        console.log(error?.message || 'Something went wrong')
        return {error: 'Something went wrong'}
    }
}


export async function getBussinessCategory() {
    try {

        const bussinessCategories = await prisma.bussinessCategory.findMany()

        return bussinessCategories

    } catch {
        return []
    }
}