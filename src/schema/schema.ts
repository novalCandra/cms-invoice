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

export const SchemaInvoice = z.object({
    client_name: z.string().min(1, "Clinet name wajib diisi").max(255, "Maximal 255 Karakter"),
    status: z.enum(['paid', 'pending', 'overide']),
    amount: z.number().int(),
    date: z.string().date(),
    dueData: z.string().date(),
    description: z.string().min(1, "wajib diisi").max(255, "maximal 255 karakter"),
    notes: z.string().min(1, "wajib diisi").max(255, "maximal 255 karakter")
})
