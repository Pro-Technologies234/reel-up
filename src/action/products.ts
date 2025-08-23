"use server"
import prisma, { Product } from "@/lib/prisma";
import { CreateProductForm } from "@/lib/schema";
import { validateRequest } from "@/lib/validate-user";
import { error } from "console";
import { mkdir } from "fs/promises";
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from "uuid";

export type FetchProductsResponse = {
    products: Product[];
    error?: string;
};

export async function fetchProducts(categoryName?: string, productName?: string, by_user?: boolean) {
    try {
        const { user } = await validateRequest();

        const products = await prisma.product.findMany({
            where: {
              ...(by_user && {
                createdById: user?.id
              }),
              ...(categoryName && { categoryName }),
              ...(productName && {
                name: { contains: productName }
              })
            },
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
                  }
                },
                wishlist: true
            }
        });

        // Map through products and add `isLiked: boolean`
        console.log(products[0].cartItems)
        return products
    } catch (error: any) {
        console.error('Unable to fetch Products', error);
        return []
    }
}
export type Products = Awaited<ReturnType<typeof fetchProducts>>


export async function fetchProduct(productId: string) {
    try {
        const product = await prisma.product.findUnique({
          where: {
            id: productId
          },
          include: {
            images : true,
            likes: true
          }
        });

        return { product };
    } catch (error: any) {
        console.error('Unable to fetch Products', error);
        return { products: [], error: error?.message || 'Unknown error' };
    }
}



export async function fetchUserProducts(): Promise<FetchProductsResponse> {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return { products:[], error: 'Unauthorized User' };
    }

    const products = await prisma.product.findMany({
      where: {
        createdById: user.id,  // Make sure your model has this field
      },
      include: {
          images: true,
          likes: {
              where: {
                  userId: user?.id || '' // Filter likes only for current user
              },
              select: { id: true } // Only fetch Like ID to check existence
          },
          createdBy: true
      }
    });

            // Map through products and add `isLiked: boolean`
        const productsWithLikeInfo = products.map(product => ({
            ...product,
            isLiked: product.likes.length > 0
        }));


    return { products: productsWithLikeInfo };
  } catch (error: any) {
    console.error('Unable to fetch User Products', error);
    return { products: [], error: error?.message || 'Unknown error' };
  }
}



export async function createProduct(_: any, data: { name: string; description: string; price: number; category: string, images: string[] }): 
Promise<{ error?: string; success?: string }> {
    try {
        const parsed = CreateProductForm.safeParse(data);
        if (!parsed.success) {
            return { error: "Invalid product data" };
        }

        const { name, description, price, images, category } = data;

        const { user } = await validateRequest();
        if (!user) {
            return { error: "Unauthorized" };
        }

        // Create Product First
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                categoryName: category,
                createdById: user.id,
            }
        });

        // Save Images Locally and in DB with SourceType
        for (let i = 0; i < images.length; i++) {
            const url = await saveImage(images[i], 'uploads')
            // Save Image with SourceType & sourceId in DB
            await prisma.productImage.create({
                data: {
                    url: url,
                    productId: product.id,
                }
            });
        }

        return { success: "Product created successfully" };
    } catch (error: any) {
        console.error("Product creation error:", error);
        return { error: error?.message || "Unknown error occurred" };
    }
}


export async function likeProduct(productId: string): Promise<{error?: string, like?: boolean}> {
  try {

    const { user } = await validateRequest()

    if (!user) {
      return { error: 'Unauthorized' }
    }

    const existingLike = await prisma.like.findFirst({
      where: {
          userId: user.id,
          productId: productId,

      }
    })

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id
        }
      })
      return { like: false }
    } else {
        await prisma.like.create({
          data: {
            userId: user.id,
            productId: productId,
          }
      })
      return { like: true }
    }

  } catch(error: any) {
    return { error: 'Unable to like this product' }
  }
}



export async function getLike(productId: string): Promise<{error?: string, success?: string}> {
  try {

    const { user } = await validateRequest()

    if (!user) {
      return { error: 'Unauthorized' }
    }

    const existingLike = await prisma.like.findFirst({
      where: {
          userId: user.id,
          productId: productId,

      }
    })

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id
        }
      })
      return { success: 'You Unliked this Product' }
    } else {
        await prisma.like.create({
          data: {
            userId: user.id,
            productId: productId,
          }
      })
      return { success: 'You Liked this Product' }
    }

  } catch(error: any) {
    return { error: 'Unable to like this product' }
  }
}



export async function getLikeCounts(productId:string) {
    try {
      const likes = await prisma.like.findMany({
        where: {
          productId: productId
        }
      })
      const likeCount = likes.length
      return { likeCount }
    } catch(error: any) {
      return { error: 'Unable to get likes' }
    }
}

export async function getProductCategory() {
  try {
       const categories = await prisma.productCategory.findMany()
       return { categories }

  } catch(error: any) {
    console.log('Unable to get Product Categories')
    return { error: 'Unable to get Product Categories' }
  }
}



export async function saveImage(img: string, folder: 'uploads', ) {
    const base64Data = img.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    const fileName = `${uuidv4()}-.png`;
    const filePath = path.join(process.cwd(), 'public', folder, fileName);
    const uploadsDir = path.join(process.cwd(), 'public', folder);
    // Ensure the uploads directory exists
    await mkdir(uploadsDir, { recursive: true });
    await writeFile(filePath, buffer);
    const url = `/${folder}/${fileName}`
    return url
}