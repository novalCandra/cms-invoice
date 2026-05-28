import { Invoice, InvoiceData } from "../types/type";
export interface InterFaceInvoice {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (invoice: InvoiceData) => void;
}

export interface InvoicePreviewPros {
    invoice: Invoice | null;
    onClose: () => void;
}