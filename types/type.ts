import { SchemaLogin, SchemaRegister } from "src/schema/schema";
import z from "zod"
export type TypeHeaderAauth = {
    propsJudul: string;
    propsDeskipsi: string;
}

export type TypeHeaderDashboard = {
    prossHeaderDashboard: string;
    propsHeaderDeskripsion: string;
    propsHeaderButton: string;
    actionButton: () => void;
}

export type TypeDataInvoices = {
    id: number | string;
    client_name: string;
    amount: number;
    status: string;
    date: string;
    dueData: string;
}

export type InvoiceData = {
    id: number | string;
    clientId: number;
    client_name: string;
    amount: number;
    dueData: string;
    date: string;
    status: "paid" | "pending" | "overdue";
    theme: typeInvoiceTheme
    customBg?: string;
    customText?: string;
    customAccent?: string;
    items?: {
        description: string;
        quantity: number;
        unitPrice: number;
    }[];
    customization?: {
        textColor: string;
        backgroundColor: string;
        accentColor: string;
        customColors: boolean;
    }
}

export type TypeQueueTask = {
    id: string;
    client_name: string;
    amount: number;
    dueData: string;
    priority: "High" | "Medium" | "Low";
    action: string;
}

export type typeInvoiceTheme = {
    id: string;
    label: string;
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    customColors: boolean;
}

export type TypeHistoryEvent = {
    id: string;
    date: string;
    time: string;
    invoiceId: string;
    clientName: string;
    amount: number;
    event: string;
    type: "paid" | "created" | "pending" | "overdue" | "modified";
    details?: string;
}

export type Invoice = {
    id: string | number;
    client_name: string;
    amount: number;
    dueData: string;
    clientId: number;
    date: string;
    status: "paid" | "pending" | "overdue";
    theme: typeInvoiceTheme
    customBg: string;
    customText: string;
    customAccent: string;
    items: {
        id: number;
        description: string;
        quantity: number;
        unitPrice: number;
        amount: number;
    }[];

    customization: {
        textColor: string;
        backgroundColor: string;
        accentColor: string;
        customColors: boolean;
    } | null;

}

export type TypeLogin = z.infer<typeof SchemaLogin>
export type TypeRegister = z.infer<typeof SchemaRegister>