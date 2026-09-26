import { AlertCircle, CheckCircle, DollarSign, Download, Edit2, Eye, FileText } from "lucide-react";
import Layout from "../../../client/components/ui/Layout";
import { useEffect, useState } from "react";
import { TypeAktivitas } from "types/type";
import axios from "axios";

const getEventIcon = (type: string) => {
    switch (type) {
        case "paid":
            return <CheckCircle size={24} className="text-status-paid" />;
        case "overdue":
            return <AlertCircle size={24} className="text-status-overdue" />;
        case "created":
            return <FileText size={24} className="text-foreground" />;
        case "pending":
            return <DollarSign size={24} className="text-status-pending" />;
        case "modified":
            return <Edit2 size={24} className="text-accent-blue" />;
        case "viewed":
            return <Eye size={24} className="text-sky-500" />;
        case "downloaded":
            return <Download size={24} className="text-yellow-500" />;
        default:
            return <FileText size={24} />;
    }
};

const getEventColor = (type: string) => {
    switch (type) {
        case "paid":
            return "border-status-paid";
        case "overdue":
            return "border-status-overdue";
        case "created":
            return "border-foreground";
        case "pending":
            return "border-status-pending";
        case "modified":
            return "border-accent-blue";
        case "viewed":
            return "border-sky-500";
        case "downloaded":
            return "border-yellow-500";
        default:
            return "border-border";
    }
};

export default function HistoryPage() {
    const [history, setHistory] = useState<TypeAktivitas[]>([]);
    useEffect(() => {
        const fetchingHistory = async () => {
            try {
                const token = localStorage.getItem("token")
                const responseData = await axios.get(`${import.meta.env.VITE_API_URL}/aktivitas`, {
                    headers: {
                        Authorization: `JWT ${token}`
                    }
                })
                setHistory(responseData.data.data);
            } catch (error) {
                console.log(error.response)
                return error;
            }
        }
        fetchingHistory();
    }, [])

    const formatedDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString("en-Gb", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    }
    const filterDataPaid = history.filter((item) => item.eventType === "paid");
    const overdueFilter = history.filter((item) => item.eventType === "overdue");
    return (
        <>
            <Layout>
                <div className="space-y-8">
                    <header>
                        <h1>History</h1>
                        <p className="text-muted-foreground text-lg mt-2">
                            User Invoice History
                        </p>
                    </header>

                    {/* static */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border-4 border-border bg-background p-6">
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                                Total Events
                            </p>
                            <p className="text-5xl font-black mt-3">{history.length || 0}</p>
                        </div>

                        <div className="border-4 border-border bg-background p-6">
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                                Payment Receided
                            </p>
                            <p className="text-5xl font-black mt-3 text-status-paid">{filterDataPaid.length || 0}</p>
                        </div>

                        <div className="border-4 border-border bg-background p-6">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                                Overdue
                            </p>
                            <p className="text-5xl font-black mt-3 text-status-overdue">{overdueFilter.length || 0}</p>
                        </div>
                    </div>

                    {/* Timelinne */}
                    <div className="relative">
                        {/* Vertical one */}
                        <div className="absolute left-6 top-0 bottom-0 w-1 bg-border md:left-12" />

                        {/* Events */}
                        <div className="space-y-6 pl-20 md:pl-32">
                            {history?.map((item, idx) => (
                                <div key={idx} className="relative">
                                    <div className={`absolute -left-14 md:-left-24 top-2 w-12 h-12 border-4 ${getEventColor(item?.eventType)} bg-background flex items-center justify-center`}>{getEventIcon(item?.eventType)}</div>
                                    {/* Event carrd */}
                                    <div className="border-4 border-border bg-background p-6 space-y-3">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                            <div>
                                                <p className="font-black text-lg">{item.eventName}</p>
                                                <p className="font-bold text-foreground">
                                                    INV-{idx + 1} - {item.invoive?.clientName}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-2xl">
                                                    {item.amount}
                                                </p>
                                                <p className="text-sm md:text-xl lg:text-lg  text-muted-foreground font-bold">
                                                    {formatedDate(item?.invoive?.date)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border-t-2 border-border pt-3">
                                            <p className="text-sm md:text-xl lg:text-lg font-semibold text-muted-foreground">
                                                {item?.invoive.description || "No description provided."}
                                            </p>
                                        </div>

                                        {/* Button Action */}
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-block px-3 py-1 font-black text-xs border-2 border-foreground uppercase ${item?.eventType === "paid" ? "bg-status-paid" : item?.eventType === "overdue" ? "bg-status-overdue" : item?.eventType === "pending" ? "bg-status-pending" : item?.eventType === "modified" ? "bg-accent-blue text-white" : item?.eventType === "viewed" ? "bg-sky-500 text-white" : item?.eventType === "downloaded" ? "bg-yellow-500 text-white" : "bg-background"}`}>
                                                {item.eventType === "paid"
                                                    ? "✓ Paid"
                                                    : item.eventType === "overdue"
                                                        ? "! Overdue"
                                                        : item.eventType === "created"
                                                            ? "New"
                                                            : item.eventType === "pending"
                                                                ? "Pending" :
                                                                item.eventType === "viewed" ? "Viewed" :
                                                                    item.eventType === "downloaded" ? "Download" : "Modified"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
