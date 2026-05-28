import { useEffect, useState } from 'react'
import HeaderDashboard from '../../components/HeaderDashboard'
import ModalPage from "../../../client/components/ui/Modal"
import { Invoice, TypeDataInvoices } from '../../../types/type'
import { ArrowUpRight } from "lucide-react"
import axios from 'axios'
import InvoicePreview from '../../components/InvoicePreview'
const getStatusColor = (status: string) => {
    switch (status) {
        case "paid":
            return "bg-status-paid text-foreground";
        case "pending":
            return "bg-status-pending text-foreground";
        case "overide":
            return "bg-status-overdue text-foreground";
        default:
            return "bg-muted text-foreground";
    }
}
export default function DashboardPage() {
    const [dataInvoice, setDataInvoice] = useState<TypeDataInvoices[]>([]);
    const [createModal, setCreateModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const handleCreateInvoice = async (newInvoice: Invoice) => {
        try {
            const token = localStorage.getItem("token")
            const createInvoiceData = await axios.post(`http://localhost:2000/api/invoices`, newInvoice, {
                headers: {
                    Authorization: `JWT ${token}`,
                    "Content-Type": "application/json"
                },
            })
            setDataInvoice((prev) => [...prev, createInvoiceData.data.data]);
            setCreateModal(false)
        } catch (error) {
            console.error(error.response.data.detail);
            return error
        }
    }

    const handleViewInvoice = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setShowPreview(true);
    };

    const formateDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    }

    const totalPaid = dataInvoice.filter((item) => item.status === "paid").reduce((total, item) => total + item.amount, 0)
    const totalOveride = dataInvoice.filter((item) => item.status === "overide").reduce((total, item) => total + item.amount, 0)
    useEffect(() => {
        const setDataInvoices = async () => {
            const token = localStorage.getItem("token");
            try {
                const respon = await axios.get(`${import.meta.env.VITE_API_URL}/invoices`, {
                    headers: {
                        Authorization: `JWT ${token}`
                    }
                },
                )
                setDataInvoice(respon.data.data)
            } catch (error) {
                return console.log(error.response.data.detail);
            }
        }
        setDataInvoices();
    }, [])
    return (
        <>
            <div className="space-y-8">
                <HeaderDashboard prossHeaderDashboard='INVOICES' propsHeaderDeskripsion='Manage and track all your invoices' propsHeaderButton='CREATE INVOICE' actionButton={() => setCreateModal(true)} />

                {/* Statst Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border-4 border-border bg-background p-6">
                        <p className='text-sm font-bold text-muted-foreground uppercase tracking-wide'>
                            Total Invoice
                        </p>
                        <p className='text-xl md:text-5xl sm:text-4xl font-black mt-3'>{dataInvoice.length ?? "0"}</p>
                    </div>

                    <div className="border-4 border-border bg-background p-6">
                        <p className='text-sm font-bold text-muted-foreground uppercase tracking-wide'>
                            Paid
                        </p>
                        <p className='text-xl md:text-3xl sm:text-2xl font-black mt-3 text-status-paid'>
                            Rp. {totalPaid.toLocaleString()}
                        </p>
                    </div>

                    <div className="border-4 border-border bg-background p-6">
                        <p className='text-sm font-bold text-muted-foreground uppercase tracking-wide'>
                            Pending
                        </p>
                        <p className='text-xl md:text-5xl sm:text-4xl font-black mt-3 text-status-overdue'>
                            Rp. {totalOveride.toLocaleString()}
                        </p>
                    </div>
                </div>
                {/* End Stats Card */}

                {/* Table */}
                <div className="hidden md:block border-4 border-border bg-background overflow-hidden">
                    <div className="overflow-auto">
                        <table className='w-full'>
                            <thead>
                                <tr className='border-b-4 border-border bg-muted'>
                                    <th className='px-6 py-4 text-left font-black text-sm uppercase'>
                                        Number
                                    </th>
                                    <th className='px-6 py-4 text-left font-black text-sm uppercase'>
                                        Client
                                    </th>
                                    <th className='px-6 py-4 text-left font-black text-sm uppercase'>
                                        Amount
                                    </th>
                                    <th className='px-6 py-4 text-left font-black text-sm uppercase'>
                                        Date
                                    </th>
                                    <th className='px-6 py-4 text-left font-black text-sm uppercase'>
                                        Due Date
                                    </th>
                                    <th className='px-6 py-4 text-left font-black text-sm uppercase'>
                                        Status
                                    </th>
                                    <th className='px-6 py-4 text-left font-black text-sm uppercase'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataInvoice.length > 0 ? (
                                    dataInvoice.map((item, index) => (
                                        <tr key={index} className={`border-2 border-border ${index % 2 === 0 ? "bg-background" : "bg-muted"} hover:bg-accent-yellow/10 transition-colors cursor-pointer`}>
                                            <td className='px-6 py-4 font-bold'>{`INV-${index + 1}`}</td>
                                            <td className='px-6 py-4 font-semibold'>{item.client_name}</td>
                                            <td className='px-6 py-4 font-bold'>Rp {item.amount.toLocaleString()}</td>
                                            <td className='px-6 py-4 text-sm'>{formateDate(item.date)}</td>
                                            <td className='px-6 py-4 text-sm'>{formateDate(item.date)}</td>
                                            <td className='px-6 py-4 text-sm'><span className={`inline-block px-4 py-2 font-black text-sm border-2 border-foreground ${getStatusColor(item.status)}`}>{item.status}</span></td>
                                            <td className='px-6 py-4'>
                                                <button onClick={() => {
                                                    handleViewInvoice(item)
                                                }} className='p-2 border-2 border-border hover:bg-muted transition-colors'>
                                                    <ArrowUpRight size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : <tr className='border-2 bg-muted border-border hover:bg-accent-yellow/10 transition-colors cursor-pointer'>
                                    <td colSpan={7} className='text-center py-10 font-bold text-muted-foreground'>
                                        Tidak ada Invoive data
                                    </td>
                                </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* End Table */}
                {/* Invoice MOBILE */}
                <div className="md:hidden space-y-4">
                    {dataInvoice.length > 0 ? (
                        dataInvoice.map((item, idx) => (
                            <div key={idx} className='border-4 border-border bg-background p-4 space-y-3'>
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className='font-black text-lg'>{`INV-${idx + 1}`}</p>
                                        <p className='font-bold text-foreground'>{item.client_name}</p>
                                        <button onClick={() => {
                                            handleViewInvoice(item)
                                        }} className='p-2 border-2 border-border hover:bg-muted transition-colors'>
                                            <ArrowUpRight size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <p className='text-muted-foreground font-bold uppercase text-xs'>
                                            Amount
                                        </p>
                                        <p className='font-black text-lg'>
                                            Rp {item.amount.toLocaleString()}
                                        </p>
                                        <p className='text-muted-foreground font-bold uppercase text-xs'>
                                            Status
                                        </p>
                                        <span className={`inline-block px-3 py-1 font-black text-sm border-2 border-foreground mt-1 ${getStatusColor(item.status)}`}>{item.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm border-t-2 border-border pt-3">
                                    <div>
                                        <p className='text-muted-foreground font-bold uppercase text-xs'>
                                            Date
                                        </p>
                                        <p>{formateDate(item.date)}</p>
                                    </div>
                                    <div>
                                        <p className='text-muted-foreground font-bold uppercase text-xs'>
                                            Due
                                        </p>
                                        <p className='font-semibold'>{formateDate(item.dueData)}</p>
                                    </div>
                                </div>
                            </div>
                        ))) : <div>
                        <p className='text-muted-foreground font-bold text-center'>
                            Tidak ada Invoive data
                        </p>
                    </div>}
                </div >
            </div >

            {/* Modal Create Invoive */}
            < ModalPage isOpen={createModal} onClose={() => setCreateModal(false)
            } onCreate={handleCreateInvoice} />
            {showPreview && (
                <InvoicePreview invoice={selectedInvoice} onClose={() => {
                    setShowPreview(false)
                    setSelectedInvoice(null)
                }} />
            )}
        </>
    )
}
