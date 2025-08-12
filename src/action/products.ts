"use server"
import prisma, { Product } from "@/lib/prisma";
import { CreateProductForm } from "@/lib/schema";
import { validateRequest } from "@/lib/validate-user";
import { error } from "console";
import { mkdir } from "fs/promises";
import { writeFile } from 'fs/promises';
import path from 'path';

export type FetchProductsResponse = {
    products: Product[];
    error?: string;
};

export async function fetchProducts() {
    try {
        const { user } = await validateRequest();

        const products = await prisma.product.findMany({
            
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



export async function createProduct(_: any, data: { name: string; description: string; price: number; images: string[] }): 
Promise<{ error?: string; success?: string }> {
    try {
        const parsed = CreateProductForm.safeParse(data);
        if (!parsed.success) {
            return { error: "Invalid product data" };
        }

        const { name, description, price, images } = data;

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
                createdById: user.id
            }
        });

        // Save Images Locally and in DB with SourceType
        for (let i = 0; i < images.length; i++) {
            const base64Data = images[i].replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, 'base64');
            const fileName = `${product.id}-${i}.png`;
            const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
            const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
            // Ensure the uploads directory exists
            await mkdir(uploadsDir, { recursive: true });
            await writeFile(filePath, buffer);

            // Save Image with SourceType & sourceId in DB
            await prisma.productImage.create({
                data: {
                    url: `/uploads/${fileName}`,
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