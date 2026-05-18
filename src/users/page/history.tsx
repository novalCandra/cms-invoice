import { AlertCircle, CheckCircle, DollarSign, Edit2, FileText } from "lucide-react";
import Layout from "../../../client/components/ui/Layout";
import { historyEvents } from "../../data/DumyDashboard";


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
        default:
            return "border-border";
    }
};

export default function HistoryPage() {
    const totalHistory = historyEvents.length;
    const paidHistory = historyEvents.filter((t) => t.type === "paid").length;
    const overorderHistory = historyEvents.filter((t) => t.type === "overdue").length;
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
                            <p className="text-5xl font-black mt-3">{totalHistory}</p>
                        </div>

                        <div className="border-4 border-border bg-background p-6">
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                                Payment Receided
                            </p>
                            <p className="text-5xl font-black mt-3 text-status-paid">{paidHistory}</p>
                        </div>

                        <div className="border-4 border-border bg-background p-6">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                                Overdue
                            </p>
                            <p className="text-5xl font-black mt-3 text-status-overdue">{overorderHistory}</p>
                        </div>
                    </div>

                    {/* Timelinne */}
                    <div className="relative">
                        {/* Vertical one */}
                        <div className="absolute left-6 top-0 bottom-0 w-1 bg-border md:left-12" />

                        {/* Events */}
                        <div className="space-y-6 pl-20 md:pl-32">
                            {historyEvents.map((item, idx) => (
                                <div key={idx} className="relative">
                                    <div className={`absolute -left-14 md:-left-24 top-2 w-12 h-12 border-4 ${getEventColor(item.type)} bg-background flex items-center justify-center`}>{getEventIcon(item.type)}</div>
                                    {/* Event carrd */}
                                    <div className="border-4 border-border bg-background p-6 space-y-3">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                            <div>
                                                <p className="font-black text-lg">{item.event}</p>
                                                <p className="font-bold text-foreground">
                                                    {item.invoiceId} - {item.clientName}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-2xl">
                                                    {item.amount.toLocaleString()}
                                                </p>
                                                <p className="text-xs text-muted-foreground font-bold">
                                                    {item.date} at {item.time}
                                                </p>
                                            </div>
                                        </div>
                                        {item.details && (
                                            <div className="border-t-2 border-border pt-3">
                                                <p className="text-sm font-semibold text-muted-foreground">
                                                    {item.details}
                                                </p>
                                            </div>
                                        )}

                                        {/* Button Action */}
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-block px-3 py-1 font-black text-xs border-2 border-foreground uppercase ${item?.type === "paid" ? "bg-status-paid" : item?.type === "overdue" ? "bg-status-overdue" : item?.type === "pending" ? "bg-status-pending" : item?.type === "modified" ? "bg-accent-blue text-white" : "bg-background"}`}>
                                                {item.type === "paid"
                                                    ? "✓ Paid"
                                                    : item.type === "overdue"
                                                        ? "! Overdue"
                                                        : item.type === "created"
                                                            ? "New"
                                                            : item.type === "pending"
                                                                ? "Pending"
                                                                : "Modified"}
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
