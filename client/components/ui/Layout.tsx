import { LogOut, Menu, Moon, Sun, X } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from "react-router-dom"
const navItems = [
    { label: "Invoice", href: "/dashboard" },
    { label: "Queue", href: "/Queue" },
    { label: "Messages", href: "/messages" },
    { label: "History", href: "/history" },
]
export default function Layout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [isDark, setIsDark] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (stored) {
            setIsDark(stored === "dark")
        } else {
            setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches)
        }
    }, [])

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    const usernameProfile = localStorage.getItem("nama");

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark")
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light")
        }
    }, [isDark])
    const handleLogout = () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("nama");
            navigate("/login")
        } catch (error) {
            return console.error(error)
        }
    }
    const isActive = (href: string) => location.pathname === href;
    return (
        <>
            <div className="flex h-screen bg-background text-foreground overflow-hidden">
                {/* Sidebar */}
                <aside className={`fixed md:relative z-40 h-screen w-64 bg-sidebar border-r-4 border-sidebar-border transition-transform md:translate-x-0 flex flex-col overflow-y-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    {/* Close */}
                    <button onClick={() => setSidebarOpen(false)} className='md:hidden absolute top-4 right-4 p-2 border-2 border-sidebar-border hover:bg-sidebar-accent'>
                        <X size={24} />

                    </button>
                    {/* End Close */}

                    {/* Logo */}
                    <div className="p-6 border-4 border-sidebar-border">
                        <h1 className='text-3xl font-black'>INVOIX</h1>
                        <p className='text-sm text-sidebar-foreground mt-1 font-bold'>
                            Invoice Management
                        </p>
                    </div>
                    {/* End Logo */}

                    {/* Navbar */}
                    <nav className='mt-8 flex flex-col gap-2 px-4'>
                        {navItems.map((item, idx) => (
                            <Link key={idx} to={item.href} className={`px-4 py-3 border-2 font-bold text-lg transition-colors ${isActive(item.href) ? "bg-sidebar-primary text-sidebar-primary-foreground border-sidebar-primary hover:text-white" : "border-sidebar-border hover:bg-sidebar-accent hover:text-white"}`}>
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    {/* End Navbar */}
                </aside>

                {/* MAIN CONTENT */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Top Navbar */}
                    <header className='border-b-4 border-border bg-background '>
                        <div className="h-20 px-6 flex items-center justify-between">
                            {/* Mobile */}
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className='md:hidden p-2 border-2 border-border hover:bg-muted'>
                                <Menu size={24} />
                            </button>

                            {/* Left Spacer */}
                            <div className="hidden md:block flex-1" />

                            {/* Rigth Section */}
                            <div className="flex items-center gap-4">
                                {/* Theme Toggle */}
                                <button onClick={toggleTheme} className='p-2 border-2 border-border hover:bg-muted transition-colors' aria-label='Toggle theme'>
                                    {isDark ? <Sun size={24} /> : <Moon size={24} />}
                                </button>

                                {/* USER AVATAR */}
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-12 bg-primary text-primary-foreground border-2 border-border flex items-center justify-center font-bold text-xl">
                                        {usernameProfile ? usernameProfile.substring(0, 2).toLowerCase() : "ND"}
                                    </div>
                                    <button onClick={() => handleLogout()} className='p-2 border-2 border-border hover:bg-muted transition-colors hidden sm:block' aria-label='Logout' title='Logout'>
                                        <LogOut size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className='flex-1 overflow-auto'>
                        <div className="p-6 md:p-8">{children}</div>
                    </main>
                    {/*  End Page content */}
                </div>
                {sidebarOpen && (
                    <div className='fixed inset-0 bg-black/40 z-30 md:hidden' onClick={() => setSidebarOpen(false)} />
                )}
                {/* END MAIN CONTENT */}
                {/* End Sidebar */}
            </div>
        </>
    )
}
