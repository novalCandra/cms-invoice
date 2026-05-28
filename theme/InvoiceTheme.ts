import { typeInvoiceTheme } from "../types/type";

const themeInvoice: typeInvoiceTheme[] = [
    {
        id: "monochrome",
        label: "Monochrome",
        backgroundColor: "#ffffff",
        textColor: "#000000",
        accentColor: "#000000",
        customColors: false,
    },
    {
        id: "yellow",
        label: "Yellow accentColor",
        backgroundColor: "#ffffff",
        textColor: "#000000",
        accentColor: "#ffdd00",
        customColors: false,
    },
    {
        id: "red",
        label: "Red accentColor",
        backgroundColor: "#ffffff",
        textColor: "#000000",
        accentColor: "#ff3333",
        customColors: false,
    },
    {
        id: "blue",
        label: "Blue accentColor",
        backgroundColor: "#ffffff",
        textColor: "#000000",
        accentColor: "#0066ff",
        customColors: false,
    },
    {
        id: "dark",
        label: "Dark Mode",
        backgroundColor: "#1a1a1a",
        textColor: "#ffffff",
        accentColor: "#ffdd00",
        customColors: false,
    },
]

export default themeInvoice;