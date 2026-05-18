import { InvoiceData } from "../types/type";
interface InterFaceInvoice {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (invoice: InvoiceData) => void;
}
export default InterFaceInvoice