'use server';

import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validate-user";

export async function getCartItems() {
    try {
        const { user } = await validateRequest();

        if (!user) {
            console.log('Unauthorized' )
            return { cartItems:[], error: 'Unauthorized' };
        }

        const cartItems = await prisma.cartItem.findMany({
            where: { userId: user.id },
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
                }
        });
        console.log('Successfully Gotten Cart Items' )
        return { cartItems };

    } catch (error: any) {
        console.error('Unable to get Cart Items', error);
        return { cartItems:[], error: error?.message || 'Unable to get Cart Items' };
    }
}

export async function getCartItem(productId: string) {
    try {
        const { user } = await validateRequest();

        if (!user) {
            return { error: 'Unauthorized' };
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                productId,
                userId: user.id
            },
            include: { product: true }  // Include Product details
        });

        return { cartItem };

    } catch (error: any) {
        console.error('Unable to get Cart Item', error);
        return { error: error?.message || 'Unable to get Cart Item' };
    }
}

export async function addCartItem(productId: string): Promise<{ error?: string; success?: string }> {
    try {
        const { user } = await validateRequest();

        if (!user) {
            return { error: 'Unauthorized' };
        }

        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                userId: user.id,
                productId
            }
        });

        if (!existingCartItem) {
            await prisma.cartItem.create({
                data: {
                    userId: user.id,
                    productId,
                    amount: 1
                }
            });
            return { success: 'Product added to Cart' };
        } else {
            const updatedItem = await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: {
                    amount: existingCartItem.amount + 1
                }
            });
            return { success: `${updatedItem.amount} of this product in cart` };
        }

    } catch (error: any) {
        console.error('[DEBUG]', error.message);
        return { error: 'Unable to add product to cart' };
    }
}

export async function removeCartItem(productId: string): Promise<{ error?: string; success?: string }> {
    try {
        const { user } = await validateRequest();

        if (!user) {
            return { error: 'Unauthorized' };
        }

        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                userId: user.id,
                productId
            }
        });

        if (!existingCartItem) {
            return {}
        }

        if (existingCartItem.amount === 1) {
            await prisma.cartItem.delete({
                where: { id: existingCartItem.id }
            });
            return { success: 'Product removed from cart' };
        } else {
            const updatedItem = await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: {
                    amount: existingCartItem.amount - 1
                }
            });
            return { success: `Removed 1 of this product from cart` };
        }

    } catch (error: any) {
        console.error('[DEBUG]', error.message);
        return { error: 'Unable to remove product from cart' };
    }
}


export async function deleteCartItem(cartItemId: number) {
    try {
        await prisma.cartItem.delete({
            where: {
                id: cartItemId
            }
        })

    } catch(error: any) {
        return { error: 'Something went wrong'}
    }
}