import { useState } from 'react'
import HeaderDashboard from '../../components/HeaderDashboard'
import ModalPage from "../../../client/components/ui/Modal"
import { TypeDataDumyDashboard } from '../../data/DumyDashboard'
import { InvoiceData, TypeDataDumy } from '../../../types/type'
import { ArrowUpRight } from "lucide-react"
const getStatusColor = (status: string) => {
    switch (status) {
        case "Paid":
            return "bg-status-paid text-foreground";
        case "Pending":
            return "bg-status-pending text-foreground";
        case "Overdue":
            return "bg-status-overdue text-foreground";
        default:
            return "bg-muted text-foreground";
    }
}
export default function DashboardPage() {
    const [dataInvoice, setDataInvoice] = useState<TypeDataDumy[]>(TypeDataDumyDashboard);
    const [createModal, setCreateModal] = useState(false);
    const handleCreteInvoice = (newInvoice: InvoiceData) => {
        setDataInvoice([newInvoice as TypeDataDumy, ...dataInvoice]);
        setCreateModal(false)
    }
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
                        <p className='text-xl md:text-5xl sm:text-4xl font-black mt-3'>0</p>
                    </div>

                    <div className="border-4 border-border bg-background p-6">
                        <p className='text-sm font-bold text-muted-foreground uppercase tracking-wide'>
                            Paid
                        </p>
                        <p className='text-xl md:text-5xl sm:text-4xl font-black mt-3 text-status-paid'>
                            Rp. 120.00
                        </p>
                    </div>

                    <div className="border-4 border-border bg-background p-6">
                        <p className='text-sm font-bold text-muted-foreground uppercase tracking-wide'>
                            Pending
                        </p>
                        <p className='text-xl md:text-5xl sm:text-4xl font-black mt-3 text-status-overdue'>
                            Rp. 200.00
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
                                {dataInvoice.map((item, index) => (
                                    <tr key={index} className={`border-2 border-border ${index % 2 === 0 ? "bg-background" : "bg-muted"} hover:bg-accent-yellow/10 transition-colors cursor-pointer`}>
                                        <td className='px-6 py-4 font-bold'>{item.id}</td>
                                        <td className='px-6 py-4 font-semibold'>{item.clientName}</td>
                                        <td className='px-6 py-4 font-bold'>Rp{item.amount.toLocaleString()}</td>
                                        <td className='px-6 py-4 text-sm'>{item.date}</td>
                                        <td className='px-6 py-4 text-sm'>{item.dueDate}</td>
                                        <td className='px-6 py-4 text-sm'><span className={`inline-block px-4 py-2 font-black text-sm border-2 border-foreground ${getStatusColor(item.status)}`}>{item.status}</span></td>
                                        <td className='px-6 py-4'>
                                            <button className='p-2 border-2 border-border hover:bg-muted transition-colors'>
                                                <ArrowUpRight size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* End Table */}


                {/* Invoice MOBILE */}
                <div className="md:hidden space-y-4">
                    {dataInvoice.map((item, idx) => (
                        <div key={idx} className='border-4 border-border bg-background p-4 space-y-3'>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className='font-black text-lg'>{item.id}</p>
                                    <p className='font-bold text-foreground'>{item.clientName}</p>
                                    <button className='p-2 border-2 border-border hover:bg-muted transition-colors'>
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
                                        ${item.amount.toLocaleString()}
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
                                    <p>{item.date}</p>
                                </div>
                                <div>
                                    <p className='text-muted-foreground font-bold uppercase text-xs'>
                                        Due
                                    </p>
                                    <p className='font-semibold'>{item.dueDate}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Create Invoive */}
            <ModalPage isOpen={createModal} onClose={() => setCreateModal(false)} onCreate={handleCreteInvoice} />
        </>
    )
}
