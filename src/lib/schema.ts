import z from "zod";


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



export const ProfileForm = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters long"),
  bio: z.string().optional(),
  avatarUrl: z.string().url("Invalid URL").optional()
});

export type ProfileFormType = z.infer<typeof ProfileForm>;



export const CreateProductForm = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
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