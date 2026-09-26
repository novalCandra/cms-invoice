import Layout from "../../../client/components/ui/Layout";
import { AlertCircle, Clock, DollarSign } from 'lucide-react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Invoice } from "types/type";
export default function QueqePage() {
    const [invoice, setInvoice] = useState<Invoice[]>([]);
    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/invoices`, {
                    headers: {
                        Authorization: `JWT ${token}`
                    }
                });
                console.log(response.data.data)
                setInvoice(response.data.data);
            } catch (error) {
                return error;
            }
        }
        fetchInvoice();
    }, [])

    const overdueInvoices = invoice.filter((t) => t.status === "overdue");
    const PendingInvoices = invoice.filter((t) => t.status === "pending");
    const paidInvoices = invoice.filter((t) => t.status === "paid");
    const formDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            month: "numeric",
            day: "numeric",
            year: "numeric"
        })
    }
    return (
        <>
            <Layout>
                <div className="space-y-8">
                    {/* Page Header */}
                    <div>
                        <h1>QUEUE</h1>
                        <p className='text-muted-foreground text-lg mt-2'>
                            Pending invoices and tasks
                        </p>
                    </div>
                    {/* Statistik */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border-4 border-border bg-background p-6">
                            <p className='text-sm font-bold text-muted-foreground uppercase tracking-wide'>
                                Total Pending
                            </p>
                            <p className='text-5xl font-black mt-3 text-status-overdue'>{PendingInvoices.length || 0}</p>
                        </div>
                        <div className="border-4 border-border bg-background p-6">
                            <p className='text-sm font-bold text-muted-foreground uppercase tracking-wide'>
                                Overdue
                            </p>
                            <p className='text-5xl font-black mt-3 text-status-pending'>
                                {overdueInvoices.length || 0}
                            </p>
                        </div>

                        <div className="border-4 border-border bg-background p-6">
                            <p className='text-sm font-bold text-muted-foreground uppercase tracking-wide'>
                                Total Amount
                            </p>
                            <p className='text-5xl font-black mt-3 text-status-paid'>
                                Rp.{invoice.reduce((sum, item) => sum + item.amount, 0).toLocaleString() || "0.0000"}
                            </p>
                        </div>
                    </div>

                    {/* Kaban Style */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Hight */}
                        <div className="space-y-4">
                            <div className="border-b-4 border-border pb-3">
                                <h3 className='text-xl font-black uppercase flex items-center gap-2'>
                                    <AlertCircle size={24} />
                                    Hight Priority
                                </h3>
                                <p className="text-sm text-muted-foreground font-bold mt-1">
                                    {paidInvoices.length || 0} task
                                </p>
                            </div>
                            <div className="space-y-3">
                                {paidInvoices.map((item) => (
                                    <div key={item.id} className="border-4 border-status-overdue bg-background p-4 space-y-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="font-black text-lg">{item.id || "-"}</p>
                                                <p className="font-black text-sm">{item.client_name || "-"}</p>
                                            </div>
                                            <span className="bg-status-overdue text-foreground px-2 py-1 font-black text-xs border-2 border-foreground">
                                                URGENT
                                            </span>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2 font-bold">
                                                <DollarSign size={16} />
                                                {item.amount || "0.0000"}
                                            </div>
                                            <div className="flex items-center gap-2 font-bold text-muted-foreground">
                                                <Clock size={16} />
                                                {formDate(item?.dueData) || "01/02/2026"}
                                            </div>
                                        </div>
                                        {/* <button className="w-full border-2 border-border px-3 py-2 font-bold text-xs uppercase hover:bg-muted transition-colors">
                                            {item.}
                                        </button> */}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Medium */}
                        <div className="space-y-4">
                            <div className="border-b-4 border-border pb-3">
                                <h3 className='text-xl font-black uppercase flex items-center gap-2'>
                                    <Clock size={24} />
                                    Medium Priority
                                </h3>
                                <p className="text-sm text-muted-foreground font-bold mt-1">
                                    {PendingInvoices.length} task
                                </p>
                            </div>
                            <div className="space-y-3">
                                {PendingInvoices?.map((item) => (
                                    <div key={item.id} className="border-4 border-status-pending bg-background p-4 space-y-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="font-black text-lg">{item.id || "-"}</p>
                                                <p className="font-black text-sm">{item.client_name || "-"}</p>
                                            </div>
                                            <span className="bg-status-pending text-foreground px-2 py-1 font-black text-xs border-2 border-foreground">
                                                ON TIME
                                            </span>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2 font-bold">
                                                <DollarSign size={16} />
                                                {item.amount || "0.0000"}
                                            </div>
                                            <div className="flex items-center gap-2 font-bold text-muted-foreground">
                                                <Clock size={16} />
                                                {formDate(item.dueData) || "01/02/2026"}
                                            </div>
                                        </div>
                                        {/* <button className="w-full border-2 border-border px-3 py-2 font-bold text-xs uppercase hover:bg-muted transition-colors">
                                            {item.action}
                                        </button> */}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Low Priotiry */}
                        <div className="space-y-4">
                            <div className="border-b-4 border-border pb-3">
                                <h3 className='text-xl font-black uppercase flex items-center gap-2'>
                                    <DollarSign />
                                    PENDING
                                </h3>
                                <p className="text-sm font-bold text-muted-foreground mt-1">
                                    {overdueInvoices.length} task
                                </p>
                            </div>
                            <div className="space-y-3">
                                {overdueInvoices?.map((item) => (
                                    <div key={item.id} className="border-4 border-status-paid bg-background p-4 space-y-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="font-black text-lg">{item.id || "-"}</p>
                                                <p className="font-black text-sm">{item.client_name || "-"}</p>
                                            </div>
                                            <span className="bg-status-paid text-foreground px-2 py-1 font-black text-xs border-2 border-foreground">
                                                ON TIME
                                            </span>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2 font-bold">
                                                <DollarSign size={16} />
                                                {item.amount || "0.0000"}
                                            </div>
                                            <div className="flex items-center gap-2 font-bold text-muted-foreground">
                                                <Clock size={16} />
                                                {formDate(item.dueData) || "01/02/2026"}
                                            </div>
                                        </div>
                                        {/* <button className="w-full border-2 border-border px-3 py-2 font-bold text-xs uppercase hover:bg-muted transition-colors">
                                            {item.action}
                                        </button> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
