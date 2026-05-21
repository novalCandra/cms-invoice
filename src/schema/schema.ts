import z from "zod"
export const SchemaLogin = z.object({
    email: z.string().email(),
    password: z.string().min(1, "minimal 1 karakter").max(255, "maximal 255 karakter")
});

export const SchemaRegister = z.object({
    email: z.string().email(),
    nama: z.string().min(1, "minimal 1 karakter").max(255, "maximal 255 karakter"),
    password: z.string().min(1, "minimal 1 karakter").max(255, "maximal 255 karakter")
})