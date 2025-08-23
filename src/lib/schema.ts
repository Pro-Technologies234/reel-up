import z from "zod";
import { BussinessType } from "./prisma";


export const RegistrationForm = z.object({
    userName: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
})

export type RegistrationFormType = z.infer<typeof RegistrationForm>;


export const LoginForm = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type LoginFormType = z.infer<typeof LoginForm>;



export const UpdateProfileForm = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters long"),
  bio: z.string().optional(),
  password: z.string().optional(),
  avatarUrl: z.string().url("Invalid URL").optional()
});

export type UpdateProfileFormType = z.infer<typeof UpdateProfileForm>;



export const CreateProductForm = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
    category: z.string(),
    
    // category: z.string().min(0,"Select at least one category for this product."),
})

export type CreateProductFormType = z.infer<typeof CreateProductForm>;

export const CreateReelForm = z.object({
    name: z.string(),
    caption: z.string().optional(),
    video: z.string().optional(),
    // category: z.string().min(0,"Select at least one category for this product."),
})

export type CreateReelFormType = z.infer<typeof CreateReelForm>;




export const BecomeSellerForm = z.object({
    bussinessName: z.string().min(1, 'Enter your bussiness name'),
    bussinessEmail: z.email().optional(),
    phoneNumber: z.string().min(1, 'Enter your bussiness phone number'),
    bussinessType: z.enum(BussinessType),
    bussinessAddress: z.string().optional(),
    bussinessRegistrationNumber: z.string().optional(),
    bussinessCategory: z.array(z.string()).optional(),
    terms: z.boolean().catch(false),
})

export type BecomeSellerFormType = z.infer<typeof BecomeSellerForm>;