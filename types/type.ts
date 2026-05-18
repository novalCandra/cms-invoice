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

export type TypeDataDumy = {
    id: string;
    clientName: string;
    amount: number;
    status: string;
    date: string;
    dueDate: string;
    theme: string;
    customBg: string;
    customText: string;
    customAccent: string;
}

export type InvoiceData = {
    id: string;
    clientName: string;
    amount: number;
    dueDate: string;
    date: string;
    status: "Paid" | "Pending" | "Overdue";
    theme: string;
    customBg: string;
    customText: string;
    customAccent: string;
}

export type QueueTask = {
    id: string;
    clientName: string;
    amount: number;
    dueDate: string;
    priority: "High" | "Medium" | "Low";
    action: string;
}

export type typeInvoiceTheme = {
    id: string;
    label: string;
    bg: string;
    text: string;
    accent: string,
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