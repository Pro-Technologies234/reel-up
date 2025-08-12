'use server'
import prisma from "@/lib/prisma"
import { validateRequest } from "@/lib/validate-user"

export async function fetchWishlists() {
    try {
        const { user } = await validateRequest()

        if (!user) {
            return  []
        }

        const wishlist = await prisma.wishList.findMany({
            where : {
                userId: user.id
            },
            include : {
                product: {
                    include: {
                        images: true,
                        likes: true,
                        createdBy: {
                            select: {
                                username: true,
                                email: true,
                                id: true
                            }
                        },
                        cartItems: {
                            where: { userId: user?.id },
                                select: {
                                    id: true,
                                    amount: true,
                                    product: {
                                    select: {
                                        id: true,
                                        name: true,
                                        description: true,
                                        price: true,
                                        images: {
                                            select: {
                                                id: true,
                                                url: true
                                            }
                                        }
                                    }
                                },
                            },
                        },
                        wishlist: true
                    }
                }
            }
        })

        return wishlist
    } catch {
        console.log('Unable to fetch wishlist')
        return []
    }
}

export type Wishlists = Awaited<ReturnType<typeof fetchWishlists>>


export async function addWishlist(productId: string) {
    try {
        const { user } = await validateRequest()
        if (!user) {
            return { error: 'Unauthorized' }
        }

        const existingWishlist = await prisma.wishList.findFirst({
            where : {
                userId: user.id,
                productId: productId
            }
        })

        if(existingWishlist) {
            await prisma.wishList.delete({
                where : {
                    id: existingWishlist.id
                }
            })
            return { wishlisted: false }
        } else {
            await prisma.wishList.create({
                data : {
                    userId: user.id,
                    productId: productId
                }
            })
            return { wishlisted: true }
        }

    } catch(error: any) {
        console.log('Unable to wishlist')
        return { error: 'Something went wrong' }
    }
}