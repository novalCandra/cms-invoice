import { Download, Eye, X } from 'lucide-react';
import { useRef } from 'react'
import { InvoicePreviewPros } from '../../interface/interFace.ts'
import axios from 'axios';

export default function InvoicePreview({ invoice, onClose }: InvoicePreviewPros) {
    const previewRef = useRef<HTMLDivElement>(null);
    if (!invoice) return null;

    // pdf
    const downloadPDF = async () => {
        if (!previewRef.current) return;
        const token = localStorage.getItem("token")
        try {
            const response = await axios.get(`http://localhost:2000/api/invoices/pdf/${invoice.id}`, {
                headers: {
                    Authorization: `JWT ${token}`
                },
                responseType: "blob"
            })
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `inoice-${invoice.id}.pdf`);
            link.click();
            link.remove();
        } catch (error) {
            console.log(error.response)
            return error;
        }
    }

    const formDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
            day: "numeric"
        })
    }
    return (
        <>
            {/* // Overlay */}
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} aria-hidden="true" />
            {/* // Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-background border-4 border-border w-full max-h-[90vh] overflow-auto flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b-4 border-border sticky top-0 bg-background">
                        <div className="flex items-center gap-2">
                            <Eye size={28} />
                            <h2 className='text-2xl font-black'>{`INT-00${invoice?.id}`}</h2>
                        </div>
                        <button onClick={onClose} className='p-2 border-2 border-border hover:bg-muted transition-colors' aria-label='close'>
                            <X size={24} />
                        </button>
                    </div>

                    {/* Preview */}
                    <div className="flex-1 p-3 sm:p-6 overflow-y-auto">
                        <div className="border-4 border-black p-5 sm:p-8 md:p-12 mx-auto aspect-[8.5/11]" ref={previewRef}>
                            {/* Invoice Content */}
                            <div className="h-full flex flex-col justify-between">
                                {/* Header */}
                                <div className="border-b-4 border-black pb-8 space-y-4">
                                    <div>
                                        <p className='text-3xl font-black leading-8'>INVOICE</p>
                                        <p className='text-xl font-bold mt-2'>{`INT-00${invoice?.id}`}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 pt-4">
                                        <div>
                                            <p className='text-xs font-bold uppercase text-opacity-70'>FROM</p>
                                            <p className='text-lg font-black mt-2'>Your Company</p>
                                        </div>
                                        <div className='text-right'>
                                            <p className='text-xs font-bold uppercase text-opacity-70'>
                                                BILL TO
                                            </p>
                                            <p className='text-lg font-black mt-2'>
                                                {invoice?.client_name}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-10">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b-4 border-black pb-6">
                                            <div>
                                                <p className='text-xs font-bold uppercase text-opacity-70'>
                                                    Invoice Date
                                                </p>
                                                <p className='text-lg font-black mt-2'>{formDate(invoice?.date)}</p>
                                            </div>
                                            <div>
                                                <p className='text-xs font-bold uppercase text-opacity-70'>
                                                    Due Date
                                                </p>
                                                <p className='text-xl font-black mt-2'>
                                                    {formDate(invoice?.dueData)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className='text-xs font-bold uppercase text-opacity-70'>
                                                    Status
                                                </p>
                                                <p className='text-lg font-bold mt-2 px-3 py-1 borde-2 border-black inline-block'>
                                                    {invoice?.status}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Amount */}
                                        <div className="border-4 border-black p-4 sm:p-6 mt-6 sm:mt-10 md:mt-8 ">
                                            <p className='text-xs font-bold uppercase text-opacity-70'>
                                                Total Amount
                                            </p>
                                            <p className='text-3xl sm:text-5xl md:text-6xl  font-bold mt-4'>
                                                Rp.{invoice?.amount.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="border-t-4 border-black pt-6 text-center">
                                        <p className='text-sm font-bold'>Thank you for your business</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-4 sm:p-6 border-t-4 border-border bg-background sticky bottom-0">
                        <button onClick={onClose} className='flex-1 px-6 py-3 border-2 border-border font-bold uppercase hover:bg-muted transition-colors text-xs'>
                            CLOSE
                        </button>
                        <button onClick={downloadPDF} className='flex-1 px-6 py-3 border-2 border-border font-bold uppercase hover:bg-muted transition-colors flex items-center justify-center gap-2 text-xs'><Download size={20} />Download</button>
                        <button className='flex-1 px-6 py-3 bg-primary text-primary-foreground border-2 border-primary font-black uppercase hover:bg-foreground hover:text-background transition-all flex items-center justify-center gap-2 text-xs'>
                            <Download size={20} /> PNG
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
