import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  LayoutDashboard,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-accent-yellow selection:text-background">
      {/* Navbar */}
      <nav className="w-full border-b-4 border-border bg-background py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 animate-in fade-in slide-in-from-top-8 duration-500">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent-yellow border-2 border-border text-background flex items-center justify-center font-black text-xl">
            C
          </div>
          <span className="font-display font-black text-2xl tracking-tighter">
            CMS-INVOIX
          </span>
        </div>
        <div className="hidden md:flex gap-6 font-bold">
          <a
            href="#features"
            className="hover:text-accent-red transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="hover:text-accent-blue transition-colors"
          >
            Pricing
          </a>
        </div>
        <div className="flex gap-4">
          <Link to="/login">
            <button className="px-5 py-2 bg-background hover:bg-muted border-2 border-border shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all">
              Login
            </button>
          </Link>
          <Link to="/register" className="hidden sm:block">
            <button className="px-5 py-2 bg-accent-yellow text-black hover:bg-accent-yellow/90 border-2 border-border shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700 delay-150 fill-mode-both">
          <div className="inline-flex items-center gap-2 bg-accent-blue/20 border-2 border-border px-4 py-2 font-bold text-sm transform -rotate-2">
            <img
              src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif"
              alt="rocket"
              className="w-6 h-6 drop-shadow-md"
            />
            The Ultimate CMS for Invoices
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] relative z-10">
            {/* <img
              src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4b8/512.gif"
              alt="money"
              className="absolute -top-10 -left-12 w-20 h-20 -z-10 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            /> */}
            Manage Invoices with <br className="hidden md:block" />
            <span className="text-accent-red underline decoration-8 underline-offset-4 relative">
              Brutal
              {/* <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4a5/512.gif" alt="explosion" className="absolute -top-12 -right-16 w-24 h-24 -z-10 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" /> */}
            </span>{" "}
            Efficiency.
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-lg">
            A fast, secure, and brutally simple invoicing system designed for
            modern businesses. Stop wrestling with clunky software.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/register">
              <button className="w-full sm:w-auto px-8 py-4 bg-accent-yellow text-black text-xl border-4 border-border shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#fff] hover:shadow-none hover:translate-y-2 hover:translate-x-2 transition-all flex items-center justify-center gap-2">
                Get Started Now <ArrowRight size={24} />
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="w-full sm:w-auto px-8 py-4 bg-background text-xl border-4 border-border shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#fff] hover:shadow-none hover:translate-y-2 hover:translate-x-2 transition-all flex items-center justify-center gap-2">
                View Demo <LayoutDashboard size={24} />
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full max-w-lg relative animate-in fade-in slide-in-from-right-8 duration-700 delay-300 fill-mode-both">
          <img
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/2728/512.gif"
            alt="sparkles"
            className="absolute -top-12 -right-8 w-28 h-28 z-20 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          />
          <div className="absolute inset-0 bg-accent-yellow translate-x-4 translate-y-4 border-4 border-border"></div>
          <div className="relative bg-background border-4 border-border p-8 h-full flex flex-col gap-6 z-10">
            {/* Mockup UI */}
            <div className="flex justify-between items-center border-b-2 border-border pb-4">
              <div className="font-bold text-xl">Recent Invoices</div>
              <div className="bg-accent-blue text-white px-3 py-1 border-2 border-border font-bold text-sm">
                New +
              </div>
            </div>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 border-2 border-border hover:bg-muted transition-colors"
              >
                <div>
                  <div className="font-bold">INV-202{i}</div>
                  <div className="text-sm opacity-80">Client {i}</div>
                </div>
                <div className="text-right">
                  <div className="font-black">${i}45.00</div>
                  <div
                    className={`text-xs text-black font-bold border-2 border-border px-2 py-0.5 mt-1 inline-block ${i === 1 ? "bg-status-paid" : i === 2 ? "bg-status-pending" : "bg-status-overdue"}`}
                  >
                    {i === 1 ? "PAID" : i === 2 ? "PENDING" : "OVERDUE"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="bg-muted py-24 border-t-4 border-border"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl text-center mb-16 font-black animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700 fill-mode-both">
            <FeatureCard
              icon={
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/26a1/512.gif"
                  alt="lightning"
                  className="w-12 h-12 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                />
              }
              title="Lightning Fast"
              description="Built on modern tech stack for blazing fast performance."
              color="bg-accent-yellow"
            />
            <FeatureCard
              icon={
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f512/512.gif"
                  alt="lock"
                  className="w-10 h-10 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                />
              }
              title="Secure Data"
              description="Your financial data is encrypted and stored securely."
              color="bg-accent-blue"
            />
            <FeatureCard
              icon={
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4c8/512.gif"
                  alt="chart"
                  className="w-10 h-10 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                />
              }
              title="Easy Tracking"
              description="Never lose track of a pending or overdue invoice again."
              color="bg-accent-red"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-border bg-background py-12 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent-yellow border-2 border-border text-background flex items-center justify-center font-black text-sm">
              C
            </div>
            <span className="font-display font-black text-xl">CMS-INVOIX</span>
          </div>
          <div className="font-bold text-sm">
            &copy; {new Date().getFullYear()} CMS-INVOIX. All rights reserved.
          </div>
          <div className="flex gap-4 font-bold">
            <a
              href="#"
              className="hover:underline hover:text-accent-blue transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:underline hover:text-accent-red transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="bg-background border-4 border-border p-8 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] dark:hover:shadow-[8px_8px_0px_0px_#fff] transition-all duration-300 flex flex-col gap-4">
      <div
        className={`w-16 h-16 ${color} border-4 border-border flex items-center justify-center`}
      >
        {icon}
      </div>
      <h3 className="text-2xl mt-4 font-black">{title}</h3>
      <p className="text-lg font-medium opacity-90">{description}</p>
    </div>
  );
}
