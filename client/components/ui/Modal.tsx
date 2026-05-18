import { X } from "lucide-react"
import InterFaceInvoice from "../../../interface/interFace.ts"
import themeInvoice from "../../../theme/InvoiceTheme.ts"
import React, { useState } from "react"
import { InvoiceData } from "types/type.ts";
export default function ModalPage({ isOpen, onClose, onCreate }: InterFaceInvoice) {
    const [clientName, setClientName] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [dueDate, setdueDate] = useState<string>("");
    const [selectedTheme, setSelectedTheme] = useState<string>("monochrome");
    const [customColors, setCustomColors] = useState(false);
    const [customBg, setCustomBg] = useState<string>("#ffffff");
    const [customText, setCustomText] = useState<string>("#000000");
    const [customAccent, setCustomAcent] = useState<string>("#000000");

    const currentTheme = themeInvoice.find((t) => t.id === selectedTheme);
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientName.trim() || !amount || !dueDate) {
            alert("isi Invoive dahulu");
            return
        };

        const invoiceData: InvoiceData = {
            id: `INV-${Date.now().toString().slice(-6)}`,
            clientName: clientName.trim(),
            amount: parseFloat(amount),
            dueDate,
            date: new Date().toISOString().split("T")[0],
            status: "Pending",
            theme: selectedTheme,
            customBg: customColors ? customBg : currentTheme!.bg,
            customText: customColors ? customText : currentTheme!.text,
            customAccent: customColors ? customAccent : currentTheme!.accent
        }
        onCreate(invoiceData);

        setClientName("");
        setAmount("");
        setSelectedTheme("monochrome");
        setCustomColors(false)
        onClose()
    }
    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50 z-40" aria-hidden="true" onClick={onClose} />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-background border-4 border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b-4 border-border sticky top-0 bg-background">
                        <h2 className="text-3xl font-black">CREATE INVOICE</h2>
                        <button onClick={onClose} className="p-2 border-2 border-border hover:bg-muted transition-colors" aria-label="Close">
                            <X size={24} />
                        </button>
                    </div>
                    {/* End Header */}

                    {/* Content */}
                    <form action="" className="p-6 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <h3 className="text-xl font-black uppercase">Invoice Details</h3>
                            <div>
                                <label htmlFor="clientName" className="block font-bold mb-2 uppercase text-sm">
                                    Client Name
                                </label>
                                <input type="text" placeholder="Enter Client Name" onChange={(e) => setClientName(e.target.value)} className="w-full px-4 py-3 border-2 border-border bg-background text-foreground font-bold" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-bold mb-2 uppercase text-sm">
                                        Amount
                                    </label>
                                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Rp." step={"0.01"} className="w-full px-4 py-3 border-2 border-border bg-background text-foreground font-bold" />
                                </div>
                                <div>
                                    <label className="block font-bold mb-2 uppercase text-sm">
                                        Due Date
                                    </label>
                                    <input type="date" value={dueDate} onChange={(e) => setAmount(e.target.value)} className="w-full px-4 py-3 border-2 border-border bg-background text-foreground font-bold" />
                                </div>
                            </div>

                        </div>

                        {/* Theme selection */}
                        <div className="space-y-4 border-t-4 border-border pt-6">
                            <h3 className="text-lg font-black uppercase">Invoice Theme</h3>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {themeInvoice.map((theme, idx) => (
                                    <button key={idx} onClick={() => {
                                        setSelectedTheme(theme.id)
                                        setCustomColors(false)
                                    }}
                                        className={`p-4 border-4 transition-all${selectedTheme === theme.id && !customColors ? "border-foreground bg-muted" : "border-border"}`}>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex gap-1">
                                                <div className="w-6 h-6 border-2 border-black" style={{ backgroundColor: theme.bg }}></div>
                                                <div className="w-6 h-6 border-2 border-black" style={{ backgroundColor: theme.accent }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-center">
                                                {theme.label}
                                            </span>
                                        </div>
                                    </button>
                                ))}

                                {/* Custom Theme */}
                                <button type="button" onClick={() => setCustomColors(!customColors)} className={`p-4 border-4 transition-all ${customColors ? "border-foreground bg-muted" : "border-border"}`}>
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-2xl font-black">+</span>
                                        <span className="text-xs font-bold">Custom</span>
                                    </div>
                                </button>
                                {/* End Custom Theme */}
                            </div>
                            {/* CUSTOM COLOR Picker */}
                            {customColors && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted border-2 border-border">
                                    <div>
                                        <label htmlFor="" className="block font-bold mb-2 uppercase text-sm">
                                            Baground
                                        </label>
                                        <div className="flex gap-2">
                                            <input type="color" value={customBg} onChange={(e) => setCustomBg(e.target.value)} className="w-12 h-12 border-2 border-border cursor-pointer" />
                                            <input type="text" value={customBg} onChange={(e) => setCustomBg(e.target.value)} placeholder="#ffffff" className="flex-1 px-3 py-2 border-2 border-border bg-background text-foreground font-bold text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="block font-bold mb-2 uppercase text-sm">
                                            Text
                                        </label>
                                        <div className="flex gap-2">
                                            <input type="color" onChange={(e) => setCustomText(e.target.value)} className="w-12 h-12 border-2 border-border cursor-pointer" />
                                            <input type="text" onChange={(e) => setCustomText(e.target.value)} className="flex px-3 py-2 border-2 border-border bg-background text-foreground font-bold text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="block font-bold mb-2 uppercase text-sm">
                                            Accent
                                        </label>
                                        <div className="flex gap-2">
                                            <input type="color" value={customAccent} onChange={(e) => setCustomAcent(e.target.value)} className="w-12 h-12 border-2 border-border cursor-pointer" />
                                            <input type="text" value={customAccent} onChange={(e) => setCustomAcent(e.target.value)} className="flex-1 px-3 py-2 border-2 border-border bg-background text-foreground font-bold text-sm" />
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>

                        {/* Preview */}
                        <div className="space-y-4 border-t-4 border-border pt-6">
                            <h3 className="text-xl font-black uppercase">PREVIEW</h3>
                            <div className="border-4 border-border p-8 aspect-video flex items-center justify-center" style={{
                                backgroundColor: customColors || selectedTheme === "dark" ? customColors ? customBg : "#1a1a1a" : "#ffffff"
                            }}>
                                <div className="text-center">
                                    <p className="text-2xl font-black mb-2" style={{ color: customColors ? customText : currentTheme?.text || "#000000" }}>
                                        INVOICE
                                    </p>
                                    <p className="text-xl font-bold" style={{ color: customColors ? customText : currentTheme?.text || "#000000" }}>
                                        {clientName || "Client name"}
                                    </p>
                                    <p className="text-sm mt-4 font-bold" style={{ color: customColors ? customAccent : currentTheme?.accent || "#000000" }}>
                                        Rp.{amount || "-"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action */}
                        <div className="flex gap-4 pt-6 border-t-4 border-border">
                            <button type="button" onClick={onClose} className="flex px-6 py-3 border-2 border-border font-bold uppercase hover:bg-muted transition-colors">
                                Cancel
                            </button>
                            <button type="submit" className="flex-1 px-6 py-3 bg-primary text-primary-foreground border-2 border-primary font-black uppercase hover:bg-foreground hover:text-background transition-all">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
